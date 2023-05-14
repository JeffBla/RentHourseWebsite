const db = require("./query");
const sql = require("../SQL/sql");

const likeCheck = (user_id, rent_info_id) => {
  return new Promise((resolve, reject) => {
    db.connect()
      .then((obj) => {
        sco = obj;

        return sco.none(sql.like.add, { user_id, rent_info_id });
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log("ERROR:", error.message || error);
        reject(error);
      })
      .finally(() => {
        if (sco) {
          sco.done();
        }
      });
  });
};

const likeUncheck = (user_id, rent_info_id) => {
  return new Promise((resolve, reject) => {
    db.connect()
      .then((obj) => {
        sco = obj;

        return sco.none(sql.like.delete, { user_id, rent_info_id });
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log("ERROR:", error.message || error);
        reject(error);
      })
      .finally(() => {
        if (sco) {
          sco.done();
        }
      });
  });
};

module.exports = { likeCheck, likeUncheck };
