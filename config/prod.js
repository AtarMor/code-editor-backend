export default {
  dbURL: process.env.MONGO_CONNECTION_STR,
  dbName : process.env.DB_NAME || 'codeblockDB'
}