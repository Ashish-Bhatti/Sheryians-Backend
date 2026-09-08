import {k8sCoreV1Api} from './config.js';

export async function createPod(sandboxId, projectId){
    const podManifest = {
        metadata: {
            name: `sandbox-${sandboxId}`,
            labels : {
                sandboxId: sandboxId,
            }
        }
    }
}