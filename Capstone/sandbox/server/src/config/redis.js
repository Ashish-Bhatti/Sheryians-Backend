import Redis from 'ioredis';
import {deletePod} from '../kubernetes/pod.js';
import {deleteService} from '../kubernetes/service.js';

export const redis = new Redis(process.env.REDIS_URL);

// we need subscriber to listen to the channel and publish to the channel
export const subscriber = new Redis(process.env.REDIS_URL);

export async function createSandboxKey(sandboxId) {
    await redis.set(
        `sandbox:${sandboxId}`,
        JSON.stringify({
            status: 'active',
        }),
        'EX',
        120
    );
}

subscriber.config('SET', 'notify-keyspace-events', 'Ex');

subscriber.subscribe('__keyevent@0__:expired')

subscriber.on('message', async (channel, key) => {
    console.log(`key expired: ${key}`);

    /**
     * sandbox:01a19cef-1659-7458-9803-e40afdd2279a
     */

    const sandboxId = key.split(':')[1];

    // delete the pod and service when the key expires
    await deletePod(sandboxId);
    await deleteService(sandboxId);
});

