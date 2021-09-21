require("dotenv").config();

const username = process.env.DB_USERNAME;
const pw = process.env.DB_PW;
const db = process.env.DB_NAME;

module.exports = {
  MONGO_URI: `mongodb+srv://${username}:${pw}@cluster0.s2bb6.mongodb.net/${db}?retryWrites=true&w=majority`,
};
