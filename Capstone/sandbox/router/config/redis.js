import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis error:', err);
});

export async function refreshTTL(sandboxId) {
    // expire method sets the expiration time for the key in seconds
    await redis.expire(`sandbox:${sandboxId}`, 120);
}

