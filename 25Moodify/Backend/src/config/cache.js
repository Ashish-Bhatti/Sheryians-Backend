const Redis = require('ioredis').default;
// we use .default because of the way ioredis exports its module and now it gives us Redis suggetions

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

redis.on('connect', () => {
    console.log('server is connected to redis');
});

module.exports = redis;
// this module will connect redis to our server