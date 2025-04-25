const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_NAME: process.env.MONGODB_NAME,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  DEXER_BASE_URL: process.env.DEXER_BASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  UUID: process.env.UUID,
};
