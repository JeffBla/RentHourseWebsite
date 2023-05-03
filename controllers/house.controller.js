const houseModule = require("../modules/house.module");
const filter_data = require("../modules/filter_data");

const houseSelect = (req, res) => {
  houseModule
    .SelectRentInfo_cover(req.body.isAuth, req.body.limit)
    .then((result) => {
      res.render("index", {
        houses: result,
        filter_data: filter_data,
      });
    })
    .catch((err) => {
      return res.send(err);
    });
};

const test = (req, res) => {
  houseModule
    .SelectRentInfo_cover(req.body.isAuth, req.body.limit)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

module.exports = { test, houseSelect };
