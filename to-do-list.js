document.title = "To-Do List";

const theItem = document.getElementById("insert-item");
const itemsList = document.getElementById("items");

//Event Listener
theItem.addEventListener("submit", addItem);
itemsList.addEventListener("click", delItem);

//Local storage
let localData = [];

function masterFunction() {
  const storedItems = JSON.parse(localStorage.getItem("items"));
  if (storedItems === null) {
    console.log("local storage empty");
  } else {
    storedItems.forEach(items => refreshList(items.text));
  }
}

masterFunction();

//Refreshing list
function refreshList(item) {
  const addListItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const itemButton = document.createElement("button");

  addListItem.className = "item-list";
  checkBox.className = "item-checkbox";
  checkBox.type = "checkbox";
  itemButton.className = "delete-item";
  itemButton.innerText = "\u2716";

  addListItem.appendChild(checkBox);
  addListItem.appendChild(document.createTextNode(item));
  addListItem.appendChild(itemButton);
  itemsList.appendChild(addListItem);
}

//Storing list
function storeList() {
  localData = [];
  let lis = document
    .getElementById("items")
    .getElementsByClassName("item-list");
  for (let i = 0; i < lis.length; i++) {
    let stringLength = lis[i].innerText.length;
    const returningItem = lis[i].innerText.slice(0, stringLength - 1);
    localData.push({ text: returningItem, status: false });
  }
  localStorage.setItem("items", JSON.stringify(localData));
}

//Dropping list
function dropList() {
  localStorage.clear();
}

//Adding Items
function addItem(e) {
  e.preventDefault();
  const newItem = document.getElementById("item").value;
  if (newItem === "") {
    alert("Enter valid string");
  } else {
    refreshList(newItem);
    document.getElementById("item").value = "";
    dropList();
    storeList();
  }
}

//Deleting Items
function delItem(obj) {
  itemsList.removeChild(obj.target.parentNode);
  storeList();
  alert("Item Deleted")
}

//Check Uncheck item
function strikeItem(){

}
