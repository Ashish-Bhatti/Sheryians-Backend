import Redis from 'ioredis';

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

subscriber.subscribe('_keyevent@0__:expired');

subscriber.on('message', (channel, key) => {
    console.log(`key expired: ${key}`);
});

