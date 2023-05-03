const pgp = require("pg-promise")(/* initOptions */);
const dotenv = require("dotenv");
dotenv.config();

const cn = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 30, // use up to 30 connections
};

console.log(`connecting ${cn} ...`);
const db = pgp(cn);

// db.connect()
//   .then((obj) => {
//     const serverVersion = obj.client.serverVersion;
//     console.log(serverVersion + " Connect Success");
//     obj.done();
//   })
//   .catch((error) => {
//     console.log("ERROR:", error.message || error);
//   });

module.exports = db;
