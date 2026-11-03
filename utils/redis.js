const Redis = require("ioredis");

// Redis is optional in deployments. Do not silently connect to localhost when
// the host has no Redis service configured.
const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL, {
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
