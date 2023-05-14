const db = require("./query");
const sql = require("../SQL/sql");

const UserRegister = (username, email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    db.connect()
      .then((obj) => {
        sco = obj;

        return sco.none(sql.users.add, { username, email, hashedPassword });
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

const CheckUser = (username) => {
  return new Promise((resolve, reject) => {
    db.connect()
      .then((obj) => {
        sco = obj;

        return sco.oneOrNone(
          "SELECT * FROM rentinfo_user WHERE name='${username:raw}'",
          {
            username,
          }
        );
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        if (sco) {
          sco.done();
        }
      });
  });
};

const CheckUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.connect()
      .then((obj) => {
        sco = obj;

        return sco.oneOrNone(
          "SELECT * FROM rentinfo_user WHERE id=${id:value}",
          {
            id,
          }
        );
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        if (sco) {
          sco.done();
        }
      });
  });
};

module.exports = { CheckUser, UserRegister, CheckUserById };
