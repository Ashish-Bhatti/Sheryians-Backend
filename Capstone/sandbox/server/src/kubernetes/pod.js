import { k8sCoreV1Api } from './config.js';

const NAMESPACE = 'default';
const POD_READY_TIMEOUT_MS = 180_000;
const POD_READY_POLL_INTERVAL_MS = 2_000;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function waitForPodReady(sandboxId) {
    const podName = `sandbox-pod-${sandboxId}`;
    const deadline = Date.now() + POD_READY_TIMEOUT_MS;

    while (Date.now() < deadline) {
        const pod = await k8sCoreV1Api.readNamespacedPod({
            name: podName,
            namespace: NAMESPACE,
        });
        const ready = pod.status?.conditions?.some(
            (condition) => condition.type === 'Ready' && condition.status === 'True',
        );

        if (ready) {
            return;
        }

        if (pod.status?.phase === 'Failed') {
            const reason = pod.status.message || pod.status.reason || 'Pod entered Failed state';
            const error = new Error(`Sandbox failed to start: ${reason}`);
            error.statusCode = 500;
            throw error;
        }

        await wait(POD_READY_POLL_INTERVAL_MS);
    }

    const error = new Error('Sandbox is taking too long to start. Please try again.');
    error.statusCode = 504;
    throw error;
}

export async function createPod(sandboxId) {
    const podManifest = {
        metadata: {
            name: `sandbox-pod-${sandboxId}`,
            labels: {
                app: 'sandbox',
                sandboxId: sandboxId,
            },
        },
        spec: {
            volumes: [
                // this volume is for syncing the agent and vite container with /workspace folder which exists inside the pod but outside of those 2  containers
                // it will a emptyDir by default and will be mounted to /workspace in the container
                {
                    name: 'workspace-volume',
                    emptyDir: {},
                }
            ],
            initContainers: [
                {
                    name: 'init-container',
                    image: 'template',
                    imagePullPolicy: 'IfNotPresent',
                    command: ['sh', '-c', 'cp -r /workspace/. /seed/'],
                    volumeMounts: [
                        {
                            name: 'workspace-volume',
                            mountPath: '/seed',
                        },
                    ],
                }
            ],
            containers: [
                {
                    image: 'template',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'sandbox-container',
                    ports: [{ containerPort: 5173, name: 'http' }],
                    readinessProbe: {
                        httpGet: { path: '/', port: 5173 },
                        periodSeconds: 2,
                        timeoutSeconds: 2,
                        failureThreshold: 60,
                    },
                    resources: {
                        limits: {
                            cpu: '500m',
                            memory: '1Gi',
                        },
                        requests: {
                            cpu: '250m',
                            memory: '512Mi',
                        },
                    },

                    // it should be mounted to /workspace in the container
                    // this is for syncing the agent and vite container with /workspace folder which exists inside the pod but outside of those 2  containers
                    // by doing we syncied the template/vite container with workspace-volume folder
                    volumeMounts: [
                        {
                            name: 'workspace-volume',
                            mountPath: '/workspace',
                        },
                    ],

                },
                {
                    image: "agent",
                    imagePullPolicy: 'IfNotPresent',
                    name: 'agent-container',
                    ports: [{ containerPort: 3000, name: 'http' }],
                    readinessProbe: {
                        httpGet: { path: '/', port: 3000 },
                        periodSeconds: 2,
                        timeoutSeconds: 2,
                        failureThreshold: 60,
                    },
                    resources: {
                        limits: {
                            cpu: '500m',
                            memory: '1Gi',
                        },
                        requests: {
                            cpu: '250m',
                            memory: '512Mi',
                        },
                    },

                    // it should be mounted to /workspace in the container
                    // this is for syncing the agent and vite container with /workspace folder which exists inside the pod but outside of those 2  containers
                    // by doing we syncied the agent/express-server container with workspace-volume folder
                    volumeMounts: [
                        {
                            name: 'workspace-volume',
                            mountPath: '/workspace',
                        },
                    ],
                }
            ],
        },
    };
    const response = await k8sCoreV1Api.createNamespacedPod({
        namespace: 'default',
        body: podManifest,
    });
    return response;
}
