// this function call when filter content changes
function editFilter(labelAreaId, checkBoxId, label, name) {
  var checkBox = document.getElementById(checkBoxId);
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
    "onClick",`onLabelDismiss("${labelAreaId}", "${checkBoxId}", "${label}", "${name}");`
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

function onLabelDismiss(labelAreaId, checkBoxId, label, name) {
  removeLabel(`${labelAreaId}`, `${checkBoxId}`, `${label}`);
  removeFilterData(`${name}`,`${label}`);
  var submenu = $(`#${checkBoxId}`).nextAll('.dropdown-submenu').first();
  if(submenu) submenu.find("*").prop("disabled", false);
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
function clearFilterData(){
  filter_data = {};
}

/*
submit data: post "/submit"
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
  if("price_permonth" in filter_data){
    data.price_permonth = [];
    filter_data.price_permonth.forEach(op => {
      if(op.includes("~")){
        data.price_permonth.push(op.trim().split('~'));
      }else if(op.includes("以下")){
        data.price_permonth.push([0,parseInt(op.trim())]);
      }else if(op.includes("以上")){
        data.price_permonth.push([parseInt(op.trim()), 999999999]);
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
  if("facilities" in filter_data){
    data.facilities = [];
    filter_data.facilities.forEach(op => {
      if(op[0] == '有')data.facilities.push(op.substring(1));
      else data.facilities.push(op);
    });
  }
  return data;
}

// Don't close when clicking inside menu for every dropdown menus.
const dropdownMenus = document.querySelectorAll(".dropdown-menu-stay");
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
function renderPageBtns(totalPage, postUrl) {
  //console.log(totalPage);
  var renderedTemplate = ejs.render(page_btns_template, {
    currentPage: filter_data.page_num,
    totalPage: totalPage,
  });
  document.getElementById("pageBtns").innerHTML = renderedTemplate;
  $(".page-link").click(function () {
    selectPage(this.innerHTML);
  });
  $(".page-link").click(function(){
    requestData(postUrl);
  });
}

//Render number of item
function renderItemCnt(itemCnt) {
  var _itemCnt = document.getElementById("itemCnt");
  if(_itemCnt)_itemCnt.innerHTML = itemCnt;
}
//Render number of liked item
function renderLikeCnt(likeCnt) {
  var _likeCnt = document.getElementById("likeCnt");
  if(_likeCnt)_likeCnt.innerHTML = likeCnt;
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
submit data: post "/submit"
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

function parseResponseData(data){
  var item_cnt, like_cnt;
  var houses = data[0];
  if(data[1][0].item_cnt) item_cnt = data[1][0].item_cnt;
  if(data[1][0].like_cnt) like_cnt = data[1][0].like_cnt;
  if(data.length>=3 && data[2][0].item_cnt) item_cnt = data[2][0].item_cnt;
  if(data.length>=3 && data[2][0].like_cnt) like_cnt = data[2][0].like_cnt;
  if(!item_cnt){
    item_cnt = like_cnt;
  }
  return [houses, item_cnt, like_cnt];
}

// Send filter data to server
function requestData(url) {
  // Make a POST request using $.ajax
  $.ajax({
    type: "POST",
    url: url,
    data: getRequestData(),
    success: function (data) {
      //console.log(data);
      var [houses, itemCnt, likeCnt] = parseResponseData(data);
      //console.log([houses, itemCnt, likeCnt])
      renderHouseItems(houses);
      renderPageBtns(
        Math.ceil(itemCnt / parseInt(filter_data.limit)),
        url
      );
      renderItemCnt(itemCnt);
      renderLikeCnt(likeCnt);
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
  if(!submenu)return;// Not parent node
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
  } else {
    submenu.find("*").prop("disabled", false);
  }
}

