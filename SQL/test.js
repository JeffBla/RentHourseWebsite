const pg = require("pg-promise");
const sql = require("./sql");

const limit = 50;
let tables = {
  rent_info: "rent_info",
  image: "image",
  house: "house",
  map_object: "map_object",
};
let tablesAlias = {
  rent_info_alias: "r",
  image_cover_alias: "i_cover",
  house_alias: "h",
  map_object_alias: "m",
  image_alias: "i",
};
let joinTableCond = [
  "r.house_id=h.id",
  "h.map_object_id=m.id",
  "i_cover.id=r.image_id_cover",
];

let joinTableCondStr = joinTableCond[0];
for (let i = 1; i < joinTableCond.length; i++) {
  joinTableCondStr += " AND " + joinTableCond[i];
}

const isAuth = false;
if (isAuth) {
  tables["user"] = "u";
  tables["favorite"] = "f";
}
// console.log(...tables);
console.log(
  pg.as.format(
    "SELECT r.id, r.title, r.coming_from,    r.price_permonth, r.url,     i_cover.url AS img_url       FROM   rent_info AS r,   image AS i_cover,   house AS h,   map_object AS m WHERE   ${joinTableCondStr:value} LIMIT ${limit:value}",
    {
      joinTableCondStr,
      limit,
    }
  )
);

// let offect = 0;
// let searchCondStr = " AND (house_type='雅房')";
// console.log(
//   pg.as.format(sql.rentInfo.selectCover, {
//     joinTableCondStr,
//     searchCondStr,
//     limit,
//     offect,
//   })
// );

// let searchCondObj = {};

// let prices = [
//   ["5000", "10000"],
//   ["10000", "20000"],
//   ["20000", "30000"],
// ];

// function insertProperty_oneDimension(obj, propertyStr, property) {
//   obj[propertyStr] = `(${propertyStr}=${property[0]}`;

//   for (let i = 1; i < property.length; i++) {
//     obj[propertyStr] += ` OR ${propertyStr}=${property[i]}`;
//   }
//   obj[propertyStr] += ")";
// }

// let house_type = ["分租套房", "雅房"];

// // searchCondObj.prices = `( (price_permonth >= ${prices[0][0]} AND price_permonth <= ${prices[0][1]})`;

// // for (let i = 1; i < prices.length; i++) {
// //   searchCondObj.prices += ` OR (price_permonth >= ${prices[i][0]} AND price_permonth <= ${prices[i][1]})`;
// // }
// // searchCondObj.prices += " )";
// if (Object.keys(searchCondObj) == 0) {
//   console.log("1");
// } else {
//   console.log("2");
// }

let a = [];
if (a.length == 0) {
  console.log(a);
} else {
  console.log("1");
}
