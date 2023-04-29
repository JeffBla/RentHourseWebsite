function myFunction(labelAreaId, checkBoxId, label) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == false){
    addLabel(labelAreaId, checkBoxId, label);
  } else {
    removeLabel(labelAreaId, checkBoxId, label);
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

// Don't close when clicking inside menu for every dropdown menus.
const dropdownMenus = document.querySelectorAll('.dropdown-menu');
dropdownMenus.forEach(menu => {
  menu.addEventListener('click', (event) => {
    event.stopPropagation();
  });
})