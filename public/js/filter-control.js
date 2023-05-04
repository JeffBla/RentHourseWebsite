// this function call when filter content changes
function editFilter(labelAreaId, checkBoxId, label, name) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == false) {
    addLabel(labelAreaId, checkBoxId, label);
    addFilterData(name, label);
  } else {
    removeLabel(labelAreaId, checkBoxId, label);
    removeFilterData(name, label);
  }
}
function addLabel(labelAreaId, checkBoxId, label) {
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
    `removeLabel("${labelAreaId}", "${checkBoxId}", "${label}")`
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
  var label = document.getElementById(labelId);
  label.parentNode.removeChild(label);
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

// Don't close when clicking inside menu for every dropdown menus.
const dropdownMenus = document.querySelectorAll(".dropdown-menu");
dropdownMenus.forEach((menu) => {
  menu.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

// Render house items
function renderHouseItems(houses){
  document.getElementById("houseItemsContainer").innerHTML = "";
  houses.forEach((house) => {
      var renderedTemplate = ejs.render(house_item_template, { house : house });
      document.getElementById("houseItemsContainer").innerHTML += renderedTemplate;
  });
}

//Render page buttons
function renderPageBtns(totalPage){
  var renderedTemplate = ejs.render(page_btns_template, { currentPage : filter_data.page, totalPage : totalPage });
  document.getElementById("pageBtns").innerHTML = renderedTemplate;
  $(".page-link").click(function (){selectPage(this.innerHTML);});
  $(".page-link").click(requestData);
}

// Function when page button pressed
function selectPage(page){
  if(page == "Previous"){
    setFilterData('page', parseInt(filter_data['page'])-1);
  }else if(page == "Next"){
    setFilterData('page', parseInt(filter_data['page'])+1);
  }else{
    setFilterData('page', page);
  }
}


// Send filter data to server
function requestData() {
  // Make a POST request using $.ajax
  $.ajax({
      type: "POST",
      url: "/submit",
      data: filter_data,
      success: function (data) {
        console.log(data);
        renderHouseItems(data);
        renderPageBtns(5);
      },
      error: function (jqXHR, textStatus, errorThrown) {
          // Code to execute on error
          console.log("Error: ", errorThrown);
      }
  });
}

// get those houses after submit button pressed.
$(document).ready(function () {
  // initialize options for certain select bar
  setFilterData('page','1');
  setFilterData('sortop','默認排序');
  setFilterData('limit','12');

  requestData();
  $(".update-house-btn").click(requestData);
});
