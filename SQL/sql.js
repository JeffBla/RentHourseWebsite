const { QueryFile } = require("pg-promise");
const { join: joinPath } = require("path");

// Helper for linking to external query files:
function sql(file) {
  const fullPath = joinPath(__dirname, file); // generating full path;
  return new QueryFile(fullPath, { minify: true });
}

module.exports = {
  // external queries for Users:
  users: {
    add: sql("user/createUser.sql"),
  },
  like: {
    add: sql("like/likeCheck.sql"),
    delete: sql("like/likeUncheck.sql"),
  },
  rentInfo: {
    selectCover: sql("rentInfo/selectRentInfo_cover.sql"),
    selectCover_count: sql("rentInfo/selectRentInfo_cover_count.sql"),
    selectCoverAll_forTest: sql("rentInfo/selectRentInfo_coverAll_forTest.sql"),
  },
};
