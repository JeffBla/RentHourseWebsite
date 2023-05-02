// this function call when filter content changes
function editFilter(labelAreaId, checkBoxId, label, title) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == false){
    addLabel(labelAreaId, checkBoxId, label);
    addFilterData(title, label);
  } else {
    removeLabel(labelAreaId, checkBoxId, label);
    removeFilterData(title, label);
  }
}
function addLabel(labelAreaId, checkBoxId, label){
  // create & add tag
  const labelArea = document.getElementById(labelAreaId);
  const tag = document.createElement("span");
  tag.id = labelAreaId+label;
  tag.classList.add("badge", "bg-secondary", "mx-1");
  tag.textContent = label;
  const closeButton = document.createElement("button");
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("aria-label", "Close");
  closeButton.setAttribute("onClick", `removeLabel("${labelAreaId}", "${checkBoxId}", "${label}")`);
  tag.appendChild(closeButton);
  labelArea.appendChild(tag);

  // check
  var checkBox = document.getElementById(checkBoxId);
  checkBox.checked = true;
}
function removeLabel(labelAreaId, checkBoxId, label){
  // remove tag
  const labelId = labelAreaId+label;
  var label = document.getElementById(labelId);
  label.parentNode.removeChild(label);
  // uncheck
  var checkBox = document.getElementById(checkBoxId);
  checkBox.checked = false;
}

let filter_data = {}
function addFilterData(key, value){
  if(key in filter_data){
    filter_data[key].push(value);
  }else{
    filter_data[key] = [value];
  }
}
function removeFilterData(key, value){
  if(key in filter_data){
    filter_data[key] = filter_data[key].filter(item => item !== value);
    if(filter_data[key].length == 0){
      delete filter_data[key];
    }
  }
}
function setFilterData(key, value){
  filter_data[key] = value;
}

// Don't close when clicking inside menu for every dropdown menus.
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
dropdownMenus.forEach(menu => {
  menu.addEventListener('click', (event) => {
    event.stopPropagation();
  });
})

// Send filter data to server &
// get those houses after submit button pressed.
$(document).ready(function () {

  // initialize options for certain select bar
  setFilterData('排序','默認排序');
  setFilterData('筆數','12');

  $(".update-house-btn").click(function () {
      // Make a POST request using $.ajax
      $.ajax({
          type: "POST",
          url: "/submit",
          data: filter_data,
          success: function (data) {
              document.getElementById("houseItemsContainer").innerHTML = "";
              data.forEach((house) => {
                  var renderedTemplate = ejs.render(house_item_template, { house : house });
                  document.getElementById("houseItemsContainer").innerHTML += renderedTemplate;
              });
          },
          error: function (jqXHR, textStatus, errorThrown) {
              // Code to execute on error
              console.log("Error: ", errorThrown);
          }
      });
  });
});