export const config = () =>
  ({
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongo: {
      uri: process.env.MONGO_URI,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    },
    market: {
      base: process.env.MARKET_API_BASE,
      access: process.env.MARKET_API_ACCESS,
    },
  } as const);

export type AppConfig = ReturnType<typeof config>;
