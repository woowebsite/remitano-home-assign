export default () => ({
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  },
  server: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
  mongodb: {
    url: process.env.MONGODB_CONNECTION_STRING,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  typeorm: {
    logging: true,
    synchronize:
      process.env.TYPEORM_AUTO_SYNC_SCHEMA_DATABASE === 'true' || false,
  },
  youtube: {
    apiUrl: process.env.YOUTUBE_API_URL,
    apiKey: process.env.YOUTUBE_API_KEY,
  },
});
