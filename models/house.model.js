const db = require("./query");
const sql = require("../SQL/sql");

const { order_by: order_byTable } = require("./filter_data");
const orderReferArr = ["r.id", "r.price_permonth", "r.price_permonth"];
const orderModeArr = ["ASC", "ASC", "DESC"];

function isObjEmpty(obj) {
  return Object.keys(obj) == 0;
}

function insertProperty_oneDimension(obj, propertyStr, property) {
  obj[propertyStr] = `(${propertyStr}='${property[0]}'`;

  for (let i = 1; i < property.length; i++) {
    obj[propertyStr] += ` OR ${propertyStr}='${property[i]}'`;
  }
  obj[propertyStr] += ")";
}

function insertProperty_interval(obj, propertyStr, property) {
  obj[
    propertyStr
  ] = `( (${propertyStr} >= ${property[0][0]} AND ${propertyStr} <= ${property[0][1]})`;

  for (let i = 1; i < property.length; i++) {
    obj[
      propertyStr
    ] += ` OR (${propertyStr} >= ${property[i][0]} AND ${propertyStr} <= ${property[i][1]})`;
  }
  obj[propertyStr] += " )";
}

function insertProperty_like(obj, propertyStr, property) {
  obj[propertyStr] = `(${propertyStr} LIKE '%${property[0]}%'`;

  for (let i = 1; i < property.length; i++) {
    obj[propertyStr] += ` OR ${propertyStr} LIKE '%${property[i]}%'`;
  }
  obj[propertyStr] += ")";
}

function handleSearchOption(
  address,
  house_type,
  price_permonth,
  published_by,
  building_type,
  area,
  floor,
  facilities,
  features,
  layout,
  min_rent_period,
  gender_requirement
) {
  let searchCondObj = {};
  if (address) {
    if (address[0].district == "") {
      searchCondObj["address"] = `( (city='${address[0].city}')`;
    } else {
      searchCondObj[
        "address"
      ] = `( (city='${address[0].city}' AND district='${address[0].district}')`;
    }

    for (let i = 1; i < address.length; i++) {
      if (address[i].district == "") {
        searchCondObj["address"] += ` OR (city='${address[i].city}')`;
      } else {
        searchCondObj[
          "address"
        ] += ` OR (city='${address[i].city}' AND district='${address[i].district}')`;
      }
    }
    searchCondObj["address"] += " )";
  }
  if (house_type) {
    insertProperty_oneDimension(searchCondObj, "house_type", house_type);
  }
  if (price_permonth) {
    insertProperty_interval(searchCondObj, "price_permonth", price_permonth);
  }
  if (published_by) {
    insertProperty_like(searchCondObj, "published_by", published_by);
  }
  if (building_type) {
    insertProperty_oneDimension(searchCondObj, "building_type", building_type);
  }
  if (area) {
    insertProperty_interval(searchCondObj, "area", area);
  }
  if (floor) {
    insertProperty_interval(searchCondObj, "floor", floor);
  }
  if (facilities) {
    insertProperty_like(searchCondObj, "facilities", facilities);
  }
  if (features) {
    insertProperty_oneDimension(searchCondObj, "features", features);
  }
  if (layout) {
    insertProperty_like(searchCondObj, "layout", layout);
  }
  if (min_rent_period) {
  }
  if (gender_requirement) {
    insertProperty_oneDimension(
      searchCondObj,
      "gender_requirement",
      gender_requirement
    );
  }

  let searchCond = "";
  if (!isObjEmpty(searchCondObj)) {
    searchCond = Object.values(searchCondObj);
    searchCond = searchCond.join(" AND ");
  }
  return searchCond;
}

const SelectRentInfo_cover = (
  isAuth = false,
  userId,
  limit = "10",
  pageNum = "1",
  orderBy = "默認排序",
  address,
  house_type,
  price_permonth,
  published_by,
  building_type,
  area,
  floor,
  facilities,
  features,
  layout,
  min_rent_period,
  gender_requirement
) => {
  // target condition
  let searchCondStr = handleSearchOption(
    address,
    house_type,
    price_permonth,
    published_by,
    building_type,
    area,
    floor,
    facilities,
    features,
    layout,
    min_rent_period,
    gender_requirement
  );

  // since it will insert in the scend condition of the sql
  // need add AND
  if (searchCondStr != "") {
    searchCondStr = " AND " + searchCondStr;
  }
  // console.log(searchCondStr);

  // handle order
  let orderTableIndex = order_byTable.findIndex((e) => {
    return e == orderBy;
  });
  // if equal -1, set default
  if (orderTableIndex == -1) {
    orderTableIndex = 0;
  }
  let orderRefer = orderReferArr[orderTableIndex];
  let orderMode = orderModeArr[orderTableIndex];

  if (!isAuth) {
    return new Promise((resolve, reject) => {
      db.connect()
        .then((obj) => {
          sco = obj;

          offect = Number(limit) * (Number(pageNum) - 1);
          return Promise.all([
            sco.any(sql.rentInfo.selectCover, {
              searchCondStr,
              orderRefer,
              orderMode,
              limit,
              offect,
            }),
            sco.any(sql.rentInfo.selectCover_count, {
              searchCondStr,
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
  } else {
    user_id = userId;

    return new Promise((resolve, reject) => {
      db.connect()
        .then((obj) => {
          sco = obj;

          offect = Number(limit) * (Number(pageNum) - 1);
          return Promise.all([
            sco.any(sql.rentInfo.selectCover_like, {
              searchCondStr,
              orderRefer,
              orderMode,
              limit,
              offect,
              user_id,
            }),
            sco.any(sql.rentInfo.selectCover_count, {
              searchCondStr,
            }),
            sco.any(sql.rentInfo.selectCover_likeCount, {
              user_id,
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
  }
};

const SelectAllRentInfo_cover_forTest = (
  isAuth = false,
  limit = "10",
  pageNum = "1",
  orderBy = "默認排序",
  address,
  house_type,
  price_permonth,
  published_by,
  building_type,
  area,
  floor,
  facilities,
  features,
  layout,
  min_rent_period,
  gender_requirement
) => {
  // implicit condition
  let joinTableCond = [
    "r.house_id=h.id",
    "h.map_object_id=m.id",
    "i_cover.id=r.image_id_cover",
  ];

  let joinTableCondStr = joinTableCond[0];
  for (let i = 1; i < joinTableCond.length; i++) {
    joinTableCondStr += " AND " + joinTableCond[i];
  }

  // target condition
  let searchCondStr = handleSearchOption(
    address,
    house_type,
    price_permonth,
    published_by,
    building_type,
    area,
    floor,
    facilities,
    features,
    layout,
    min_rent_period,
    gender_requirement
  );

  // since it will insert in the scend condition of the sql
  // need add AND
  if (searchCondStr != "") {
    searchCondStr = " AND " + searchCondStr;
  }
  // console.log(searchCondStr);

  // handle order
  let orderTableIndex = order_byTable.findIndex((e) => {
    return e == orderBy;
  });
  // if equal -1, set default
  if (orderTableIndex == -1) {
    orderTableIndex = 0;
  }
  let orderRefer = orderReferArr[orderTableIndex];
  let orderMode = orderModeArr[orderTableIndex];

  if (!isAuth) {
    return new Promise((resolve, reject) => {
      db.connect()
        .then((obj) => {
          sco = obj;

          offect = Number(limit) * (Number(pageNum) - 1);
          return Promise.all([
            sco.any(sql.rentInfo.selectCoverAll_forTest, {
              searchCondStr,
              orderRefer,
              orderMode,
              limit,
              offect,
            }),
            sco.any(sql.rentInfo.selectCover_count, {
              searchCondStr,
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
  } else {
    return new Promise((resolve, reject) => {
      db.connect()
        .then((obj) => {
          sco = obj;

          offect = Number(limit) * (Number(pageNum) - 1);
          return Promise.all([
            sco.any(sql.rentInfo.selectCoverAll_forTest, {
              searchCondStr,
              orderRefer,
              orderMode,
              limit,
              offect,
            }),
            sco.any(sql.rentInfo.selectCover_count, {
              searchCondStr,
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
  }
};

const SelectRentInfo_favor = (
  userId,
  limit = "10",
  pageNum = "1",
  orderBy = "默認排序"
) => {
  // handle order
  let orderTableIndex = order_byTable.findIndex((e) => {
    return e == orderBy;
  });
  // if equal -1, set default
  if (orderTableIndex == -1) {
    orderTableIndex = 0;
  }
  let orderRefer = orderReferArr[orderTableIndex];
  let orderMode = orderModeArr[orderTableIndex];

  offect = Number(limit) * (Number(pageNum) - 1);
  return new Promise((resolve, reject) => {
    db.connect()
      .then((obj) => {
        sco = obj;

        return Promise.all([
          sco.any(sql.rentInfo.selectFavor, {
            userId,
            orderRefer,
            orderMode,
            limit,
            offect,
          }),
          sco.any(sql.rentInfo.selectFavor_count, {
            userId,
          }),
        ]);
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

module.exports = {
  SelectRentInfo_cover,
  SelectAllRentInfo_cover_forTest,
  SelectRentInfo_favor,
};
