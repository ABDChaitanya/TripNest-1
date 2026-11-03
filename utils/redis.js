const Redis = require("ioredis");

// Redis is optional. Configure REDIS_URL only when a Redis server is running.
const redisUrl = process.env.REDIS_URL?.trim();
const redis = redisUrl
  ? new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      connectTimeout: 3000
    })
  : null;

if (redis) {
  redis.on("connect", () => {
    console.log("Connected to Redis");
  });

  redis.on("error", (err) => {
    console.log("Redis error:", err.message);
  });
}

module.exports = redis;
