const houseModule = require("../modules/house.module");
const wareHouse = require("../src/repository/index");
const filter_data = require("../src/repository/filter_data");

const houseSelect = (req, res) => {
  houseModule
    .SelectRentInfo_cover(req.body.isAuth, req.body.limit)
    .then((result) => {
      repo = new wareHouse.Repository();

      res.render("index", {
        houses: repo.getHouses(),
        filter_data: filter_data,
      });
      console.log(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

const test = (req, res) => {
  houseModule
    .SelectRentInfo_cover(req.body.isAuth, req.body.limit)
    .then((result) => {
      repo = new wareHouse.Repository();

      res.send(result);
    })
    .catch((err) => {
      return res.send(err);
    });
};

module.exports = { test, houseSelect };
