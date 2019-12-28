document.title = "To-Do List";

const theItem = document.getElementById("insert-item");
const itemsList = document.getElementById("items");
// const checkBoxItems = document.getElementById("items");

let index = 0;
masterFunction();

//Event Listener
theItem.addEventListener("submit", addItem);

//master function
function masterFunction() {
  const storedItems = JSON.parse(localStorage.getItem("items"));
  if (storedItems === null) {
    console.log("local storage empty");
  } else {
    storedItems.forEach(items => refreshList(items.text,items.status));
  }
}

//Refreshing list
function refreshList(item,status) {

  if(status===undefined){
    status=false
  }

  const addListItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const text = document.createElement("div")
  const itemButton = document.createElement("button");

  addListItem.className = "item-list";
  addListItem.setAttribute("position",index++)
  checkBox.className = "item-checkbox";
  checkBox.type = "checkbox";
  text.textContent=item;
  checkBox.addEventListener("click", strikeItem);
  itemButton.className = "delete-item";
  itemButton.innerText = "\u2716";
  itemButton.addEventListener("click", delItem);

  if(status===true){
    text.style.textDecoration = "line-through";
  }else if(status===false){
    text.style.textDecoration = "none";
  }
  

  addListItem.appendChild(checkBox);
  addListItem.appendChild(text);
  addListItem.appendChild(itemButton);
  itemsList.appendChild(addListItem);
}

//Storing list
function storeList() {
  let localData = [];
  let lis = document
    .getElementById("items")
    .getElementsByClassName("item-list");
  for (let i = 0; i < lis.length; i++) {
    myStat=lis[i].childNodes[0].checked
    let stringLength = lis[i].innerText.length;
    const returningItem = lis[i].innerText.slice(0, stringLength - 1);
    localData.push({ text: returningItem, status: myStat });
  }
  localStorage.setItem("items", JSON.stringify(localData));
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
    storeList();
  }
}

//Deleting Items
function delItem(obj) {
  //itemsList.removeChild(obj.target.parentNode);
  storeList();
  alert("Item Deleted");
}

//Check Uncheck item
function strikeItem(obj) {
  // index=obj.target.parentNode.getAttribute("position")
  // const storedItems = JSON.parse(localStorage.getItem("items"));
  // console.log(index)
  // storedItems[index].status=true;
  // console.log('storage',storedItems[index].status)
  // console.log('checkbox',obj.target.checked)
  // storedItems[index].status=obj.target.checked
  // // refreshList();
  storeList();

  // console.log(storedItems[])
  // get local Storage
  // traverse to the element
  // obj.target.parentNode.style.textDecoration = "line-through";
}
