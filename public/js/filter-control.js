// this function call when filter content changes
function editFilter(labelAreaId, checkBoxId, label, name) {
  console.log(label);
  var checkBox = document.getElementById(checkBoxId);
  console.log(checkBox.checked);
  if (checkBox.checked == false) {
    addLabel(labelAreaId, checkBoxId, label, name);
    addFilterData(name, label);
  } else {
    removeLabel(labelAreaId, checkBoxId, label, name);
    removeFilterData(name, label);
  }
}
function addLabel(labelAreaId, checkBoxId, label, name) {
  // create & add tag
  const labelArea = document.getElementById(labelAreaId);
  const tag = document.createElement("span");
  tag.id = labelAreaId + label;
  tag.classList.add("badge", "bg-secondary", "mx-1");
  tag.textContent = label;
  const closeButton = document.createElement("button");
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("aria-label", "Close");
  closeButton.setAttribute(
    "onClick",
    `removeLabel("${labelAreaId}", "${checkBoxId}", "${label}");
    removeFilterData("${name}","${label}");`
  );
  tag.appendChild(closeButton);
  labelArea.appendChild(tag);

  // check
  var checkBox = document.getElementById(checkBoxId);
  checkBox.checked = true;
}
function removeLabel(labelAreaId, checkBoxId, label) {
  // remove tag
  const labelId = labelAreaId + label;
  var _label = document.getElementById(labelId);
  _label.parentNode.removeChild(_label);
  // uncheck
  var checkBox = document.getElementById(checkBoxId);
  checkBox.checked = false;
}

let filter_data = {};
function addFilterData(key, value) {
  if (key in filter_data) {
    filter_data[key].push(value);
  } else {
    filter_data[key] = [value];
  }
}
function removeFilterData(key, value) {
  if (key in filter_data) {
    filter_data[key] = filter_data[key].filter((item) => item !== value);
    if (filter_data[key].length == 0) {
      delete filter_data[key];
    }
  }
}
function setFilterData(key, value) {
  filter_data[key] = value;
}

/*
submit data: post "/sunmit"
data : {
    'page_num' : 目前頁碼,
    'order_by' : 排序選項,
    'limit' : 筆數,
    'address' : [{city:縣市,district:鄉鎮市區}],
    'house_type' : [房屋型態],
    'price_permonth' : [[min, max]],
    'published_by' : [刊登身份],
    'building_type' : [建物型態],
    'area' : [[min,max]],
    'floor' : [[min,max]],
    'facilities' : [設備],
    'features' : [特色],
    'layout' : [格局],
    'min_rent_period' : [最短租期],
    'gender_requirement' : [性別條件],
  }
*/
function getRequestData(){
  var data = {};
  Object.assign(data, filter_data);
  if("address" in filter_data){
    data.address = [];
    filter_data.address.forEach(op => {
      data.address.push({city: op.substring(0,3), district:op.substring(3)});
    });
  }
  if("prices" in filter_data){
    data.prices = [];
    filter_data.prices.forEach(op => {
      if(op.includes("~")){
        data.prices.push(op.trim().split('~'));
      }else if(op.includes("以下")){
        data.prices.push([0,parseInt(op.trim())]);
      }else if(op.includes("以上")){
        data.prices.push([parseInt(op.trim()), 999999999]);
      }
    });
  }
  if("area" in filter_data){
    data.area = [];
    filter_data.area.forEach(op => {
      if(op.includes("-")){
        data.area.push(op.trim().replace("坪","").split('-'));
      }else if(op.includes("以下")){
        data.area.push([0,parseInt(op.trim())]);
      }else if(op.includes("以上")){
        data.area.push([parseInt(op.trim()), 999999999]);
      }
    });
  }
  if("floor" in filter_data){
    data.floor = [];
    filter_data.floor.forEach(op => {
      if(op.includes("-")){
        data.floor.push(op.trim().replace("層","").replace("樓","").split('-'));
      }else if(op.includes("以下")){
        data.floor.push([-999999999,parseInt(op.trim())]);
      }else if(op.includes("以上")){
        data.floor.push([parseInt(op.trim()), 999999999]);
      }else{
        data.floor.push([parseInt(op.trim()), parseInt(op.trim())]);
      }
    });
  }
  return data;
}

// Don't close when clicking inside menu for every dropdown menus.
const dropdownMenus = document.querySelectorAll(".dropdown-menu");
dropdownMenus.forEach((menu) => {
  menu.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

// Render house items
function renderHouseItems(houses) {
  document.getElementById("houseItemsContainer").innerHTML = "";
  houses.forEach((house) => {
    var renderedTemplate = ejs.render(house_item_template, { house: house });
    document.getElementById("houseItemsContainer").innerHTML +=
      renderedTemplate;
  });
}

//Render page buttons
function renderPageBtns(totalPage) {
  //console.log(totalPage);
  var renderedTemplate = ejs.render(page_btns_template, {
    currentPage: filter_data.page_num,
    totalPage: totalPage,
  });
  document.getElementById("pageBtns").innerHTML = renderedTemplate;
  $(".page-link").click(function () {
    selectPage(this.innerHTML);
  });
  $(".page-link").click(requestData);
}

//Render page buttons
function renderItemCnt(itemCnt) {
  document.getElementById("itemCnt").innerHTML = itemCnt;
}

// Function when page button pressed
function selectPage(page) {
  if (page == "Previous") {
    setFilterData("page_num", parseInt(filter_data["page_num"]) - 1);
  } else if (page == "Next") {
    setFilterData("page_num", parseInt(filter_data["page_num"]) + 1);
  } else {
    setFilterData("page_num", page);
  }
}

/*
submit data: post "/sunmit"
request_data : {
    'page_num' : 目前頁碼,
    'order_by' : 排序選項,
    'limit' : 筆數,
    'address' : [{city:縣市,district:鄉鎮市區}],
    'house_type' : [房屋型態],
    'price_permonth' : [[min, max]],
    'published_by' : [刊登身份],
    'building_type' : [建物型態],
    'area' : [[min, max]],
    'floor' : [[min, max]],
    'facilities' : [設備],
    'features' : [特色],
    'layout' : [格局],
    'min_rent_period' : [最短租期],
    'gender_requirement' : [性別條件],
  }

  response＿data :{
    houses : {
      id, title, url, img_url, price_permonth, coming_from, like（如果沒登入就是0）
    },
    like_cnt, //總共幾個like
    item_cnt, //條件下u 共幾個item
  }
*/

// Send filter data to server
function requestData() {
  // Make a POST request using $.ajax
  $.ajax({
    type: "POST",
    url: "/submit",
    data: getRequestData(),
    success: function (data) {
      //console.log(data);
      renderHouseItems(data[0]);
      renderPageBtns(
        Math.ceil(data[1][0].item_cnt / parseInt(filter_data.limit))
      );
      renderItemCnt(data[1][0].item_cnt);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Code to execute on error
      console.log("Error: ", errorThrown);
    },
  });
}

function disableSubmenu() {
  // Disable submenu when the parent checkbox checked.
  // Remove children label in label area at the same time.
  let submenu = $(this).find(".dropdown-submenu");
  let checkBox = $(this).find(".form-check-input")[0];
  if (checkBox.checked) {
    let checkBoxes = submenu.find(".form-check-input");
    for( var i = 0; i < checkBoxes.length; i++){
      if(checkBoxes[i].checked){
        // remove the tag and the check
        eval($(checkBoxes[i].parentNode).attr("onclick"));
      }
    }
    submenu.find("*").prop("disabled", true);
    console.log('check');
  } else {
    console.log('uncheck');
    submenu.find("*").prop("disabled", false);
  }
}

// get those houses after submit button pressed.
$(document).ready(function () {
  // initialize options for certain select bar
  setFilterData("page_num", "1");
  setFilterData("order_by", "默認排序");
  setFilterData("limit", "12");

  requestData();
  $(".update-house-btn").click(requestData);
  $(".disable-submenu").click(disableSubmenu);
});
