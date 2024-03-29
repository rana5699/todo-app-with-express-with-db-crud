require("dotenv").config();

// Accessing environment variables
const dev = {
  app: {
    port: process.env.PORT || 3000,
  },
  databse: {
    databaseUrl:
      process.env.DATABASE_STRING || "mongodb://localhost:271027/todoApp",
  },
};

module.exports = dev;
