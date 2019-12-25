// console.dir(document)

document.title = "To-Do List";
// console.log(document)

const theItem = document.getElementById("insert-item");
const itemsList = document.getElementById("items");

//Event Listening
theItem.addEventListener("submit", addItem);
itemsList.addEventListener("click", delItem);

//Adding item
function addItem(e) {
  e.preventDefault();

  const newItem = document.getElementById("item").value;
  // console.log(newItem)
  if (newItem === "") {
    alert("Enter valid string");
  } else {
    const addListItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const itemButton = document.createElement("button");

    addListItem.className = "item-list";
    checkBox.className = "item-checkbox";
    checkBox.type = "checkbox";
    itemButton.className = "delete-item";
    itemButton.innerText = "\u2716";

    addListItem.appendChild(checkBox);
    addListItem.appendChild(document.createTextNode(newItem));
    addListItem.appendChild(itemButton);

    itemsList.appendChild(addListItem);
    document.getElementById("item").value = "";
  }
}

//Deleting item
function delItem(obj) {
  itemsList.removeChild(obj.target.parentNode);
  alert("Item Deleted");
}


