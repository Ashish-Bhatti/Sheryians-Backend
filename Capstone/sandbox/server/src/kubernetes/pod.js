import { k8sCoreV1Api } from './config.js';

export async function createPod(sandboxId) {
    const podManifest = {
        metadata: {
            name: `sandbox-pod-${sandboxId}`,
            labels: {
                app : 'sandbox',
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

