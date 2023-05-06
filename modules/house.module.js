const db = require("./query");
const sql = require("../SQL/sql");

const SelectRentInfo_cover = (isAuth = false, limit = 10) => {
  let joinTableCond = [
    "r.house_id=h.id",
    "h.map_object_id=m.id",
    "i_cover.house_id=r.image_id_cover",
  ];

  let joinTableCondStr = joinTableCond[0];
  for (let i = 1; i < joinTableCond.length; i++) {
    joinTableCondStr += " AND " + joinTableCond[i];
  }
  return new Promise((resolve, reject) => {
    db.connect()
      .then((obj) => {
        sco = obj;

        return Promise.all([
          sco.any(sql.rentInfo.selectCover, {
            joinTableCondStr,
            limit,
          }),
          sco.any(sql.rentInfo.selectCover_cover, {
            joinTableCondStr,
          }),
        ]);
      })
      .then((data) => {
        console.log(data);
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

const SelectAllRentInfo_cover_forTest = (isAuth = false, limit = 10) => {
  let joinTableCond = [
    "r.house_id=h.id",
    "h.map_object_id=m.id",
    "i_cover.house_id=r.image_id_cover",
  ];

  let joinTableCondStr = joinTableCond[0];
  for (let i = 1; i < joinTableCond.length; i++) {
    joinTableCondStr += " AND " + joinTableCond[i];
  }
  return new Promise((resolve, reject) => {
    db.connect()
      .then((obj) => {
        sco = obj;
        return sco.any(sql.rentInfo.selectCoverAll_forTest, {
          joinTableCondStr,
          limit,
        });
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

module.exports = { SelectRentInfo_cover, SelectAllRentInfo_cover_forTest };
