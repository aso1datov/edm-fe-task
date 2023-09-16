module.exports = {
  HOST: process.env.MONGODB_HOST || "0.0.0.0",
  PORT: process.env.MONGODB_PORT || 27017,
  DB: process.env.DB_NAME || "test_db",
};
