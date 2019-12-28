document.title = "To-Do List";

const theItem = document.getElementById("insert-item");
const itemsList = document.getElementById("items");
let localData = JSON.parse(localStorage.getItem("items"));

if(localData===null){
  localData=[]
  localStorage.setItem("items", JSON.stringify(localData));
}

let index=0;

refreshDOM()

//Events Listener
theItem.addEventListener("submit", addItem);

  //Updating local storage
  function updateData() {
    localStorage.setItem("items", JSON.stringify(localData));
    refreshDOM();
  }

// updating DOM
function refreshDOM(){
  index=0
    while (itemsList.hasChildNodes()) {
        itemsList.removeChild(itemsList.lastChild);
    }
    let storedItems = JSON.parse(localStorage.getItem("items"));
    for (items of storedItems)
      {
        refreshList(items)
      }
    // console.log(storedItems)
    
}

//Updating HTMl items
function refreshList(items) {

    // if(status===undefined){
    //   status=false
    // }
    const addListItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const text = document.createElement("div")
    const itemButton = document.createElement("button");
  
    addListItem.className = "item-list";
    addListItem.draggable = true;
    addListItem.setAttribute("position",index++)
    checkBox.className = "item-checkbox";
    checkBox.type = "checkbox";
    checkBox.checked=items.status
    text.appendChild(document.createTextNode(items.text));
    checkBox.addEventListener("click", strikeItem);
    itemButton.className = "delete-item";
    itemButton.innerText = "\u2716";
    itemButton.addEventListener("click", delItem);

    itemsList.addEventListener('dragstart', dragStart);
    itemsList.addEventListener('dragover', dragOver);
    itemsList.addEventListener('dragend', dragStop);
  
    if(items.status===true){
      text.style.textDecoration = "line-through";
    }else if(status===false){
      text.style.textDecoration = "none";
    }

  
    addListItem.appendChild(checkBox);
    addListItem.appendChild(text);
    addListItem.appendChild(itemButton);
    itemsList.appendChild(addListItem);
  }


  //Adding Items
function addItem(obj) {
    obj.preventDefault();
    const newItem = document.getElementById("item").value;
    if (newItem === "") {
      alert("Enter valid string");
    } else {
        localData.push({ text: newItem, status: false });
      document.getElementById("item").value = "";
      updateData();
    }
  }

  //Deleting Item
  function delItem(obj) {
    const deletingItem=obj.target.parentNode.attributes.position.value;
    localData.splice(deletingItem,1);
    updateData();
    alert("Item Deleted");
  }

  //Check uncheck items
  function strikeItem(obj) {
    parent=obj.target.parentNode
    const itemPosition=parent.attributes.position.value;
    console.log(parent.firstChild.checked)
    localData[itemPosition].status=parent.firstChild.checked; 
    // storedItems[index].status=true;
    // console.log('storage',storedItems[index].status)
    // console.log('checkbox',obj.target.checked)
    // storedItems[index].status=obj.target.checked
    //  refreshList();
    updateData();
  }


  var startPos = 0;
var endPos = 0;

function dragStart(obj) {
  // console.log(obj.target.attributes.position.value)
    startPos = obj.target.attributes.position.value;
    // console.log('start',startPos)
}

function dragOver(obj) {
    obj.preventDefault();
    console.log(obj.target.attributes.position.value)
    endPos = obj.target.attributes.position.value;
    // console.log('end',endPos)
}

function dragStop(obj) {
  const draggedItem = localData.splice(startPos, 1);
  localData.splice(endPos, 0, draggedItem[0]);

    // var splicedArray = localData.splice(startIndex, 1);
    // localData.splice(endIndex, 0, splicedArray[0]);

    updateData();
}
