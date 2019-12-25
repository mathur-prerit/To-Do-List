// console.dir(document)

document.title = "To-Do List";
// console.log(document)

const theItem = document.getElementById("insert-item");
const itemsList = document.getElementById("items");

//local storage configuration
let itemsObject = [];
const storedItems = JSON.parse(localStorage.getItem("items"));
if (storedItems === null){
  console.log('local storage empty');
}
else{
  itemsObject=itemsObject.concat(storedItems);
  itemsObject.forEach(items =>defaultItems(items.text));
}

//Refresh items
function defaultItems(item){
  

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

//Event Listening
theItem.addEventListener("submit", addItem);
itemsList.addEventListener("click", delItem);

//Adding item
function addItem(e) {
  e.preventDefault();

  const newItem = document.getElementById("item").value;
  //Validation for empty string
  if (newItem === "") {
    alert("Enter valid string");
  } else {
    defaultItems(newItem)

    //Local storage
    itemsObject.push({text:newItem,status:false});
    localStorage.setItem("items", JSON.stringify(itemsObject));

    //Refreshing the form
    document.getElementById("item").value = "";
  }
}

//Deleting item
function delItem(obj) {
  // itemsList.removeChild(obj.target.parentNode);
  let stringLength=obj.target.parentNode.innerText.length
  let cleanedString = obj.target.parentNode.innerText.slice(0,stringLength-1)

  for(let i=0;i<itemsObject.length;i++){
    if(itemsObject[i].text===cleanedString){
      itemsObject.pop(itemsObject[i])
    }
  }
  localStorage.setItem("items",JSON.stringify(itemsObject));
  alert("Item Deleted");
}

//Check Uncheck item
function strikeItem(){

}