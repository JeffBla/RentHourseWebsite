const db = require("./query");
const sql = require("../SQL/sql");

const SelectRentInfo_cover = (
  isAuth = false,
  limit = "10",
  pageNum = "1",
  orderBy = "默認排序",
  address,
  types,
  prices,
  identity,
  house_type,
  area,
  floor,
  facilities,
  layout,
  min_rent_period,
  gender_requirement
) => {
  let joinTableCond = [
    "r.house_id=h.id",
    "h.map_object_id=m.id",
    "i_cover.id=r.image_id_cover",
  ];

  let joinTableCondStr = joinTableCond[0];
  for (let i = 1; i < joinTableCond.length; i++) {
    joinTableCondStr += " AND " + joinTableCond[i];
  }
  return new Promise((resolve, reject) => {
    db.connect()
      .then((obj) => {
        sco = obj;

        offect = Number(limit) * (Number(pageNum) - 1);
        return Promise.all([
          sco.any(sql.rentInfo.selectCover, {
            joinTableCondStr,
            limit,
            offect,
          }),
          sco.any(sql.rentInfo.selectCover_cover, {
            joinTableCondStr,
          }),
        ]);
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
