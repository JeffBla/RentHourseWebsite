const pg = require("pg-promise");

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
  "i_cover.house_id=r.image_id_cover",
  "i.house_id=h.id",
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
    "SELECT * FROM rent_info AS r, image AS i_cover, house AS h, map_object AS m, image AS i  WHERE ${joinTableCondStr:value} LIMIT ${limit:value} ",
    {
      joinTableCondStr,
      limit,
    }
  )
);
