"use strict";

const express = require("express");
const router = new express.Router();
const houseCtrl = require("../controllers/house.controller");

/* eslint-disable no-unused-vars */
router.route("/").get(houseCtrl.houseSelect);

router.route("/testHouse").get(houseCtrl.SelectAllHouseData);

router.route("/submit").post(houseCtrl.submit_search);

router.route("/test-house-page").get((req, res) => {
    res.render("house_page", {
        house_data : {
            address : "新北市汐止區仁愛路",
            id : "-1",
            title : "近汐止火車站，上班族首選",
            house_id : "-1",
            price_permonth : "6000",
            published_by : "-1",
            house_type : "雅房",
            building_type : "透天",
            area : "6.2",
            floor : "5",
            facilities : ["有冷氣", "有洗衣機", "有冰箱", "有熱水器", "有網絡"],
            features : ["可養寵物", "可開伙","有車位"],
            layout : "1房 1衛浴 1陽台 1廚房",
            gender_requirement : "男女皆可",
            other_desc : "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            url : "https://www.dd-room.com/object/da9dtxsyiy7rlcuh",
            coming_from : "租租通",
            image_urls : ["https://static.dd-room.com/images/object/d/a/9/da9dtxsyiy7rlcuh/cover/000a5a59833eaad798189ff851e7f66f_766x510.jpg",
                          "https://static.dd-room.com/images/object/d/a/9/da9dtxsyiy7rlcuh/cover/6d23cd3cdd6724032b6467b8757dd4ea_766x510.jpg",
                          "https://static.dd-room.com/images/object/d/a/9/da9dtxsyiy7rlcuh/cover/bf4c3ccf989a4ffa9cb03f7765355621_766x510.jpg"],
            address : "新北市汐止區仁愛路",
        },
    });
});

module.exports = router;
