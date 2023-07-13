let taskItemContainer = document.getElementById("task-items-container");
let AddButton = document.getElementById("addButton");
let SaveButton = document.getElementById("saveButton");



function getFromTodolist() {
    let stringifiedList = localStorage.getItem("taskItem");
    let parsedTaskElement = JSON.parse(stringifiedList);
    if (parsedTaskElement === null) {
        return [];
    } else {
        return parsedTaskElement;
    }
}



let taskItem = getFromTodolist();

let todoCount = taskItem.length;
SaveButton.onclick = function() {
    localStorage.setItem("taskItem", JSON.stringify(taskItem));
}


function statusChange(checkBoxId, labelId, taskElementId) {
    let checkBoxELement = document.getElementById(checkBoxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("label-text-changes");


    let taskItemIndex = taskItem.findIndex(function(eachItem) {
        let eachItemId = "taskElement" + eachItem.uniqueNo;
        if (eachItemId === taskElementId) {
            return true;
        } else {
            return false;
        }
    });
    let taskItemObject = taskItem[taskItemIndex];

    if (taskItemObject.isChecked === true) {
        taskItemObject.isChecked = false;
    } else {
        taskItemObject.isChecked = true;
    }
}

function onDeleteIcon(taskElementId) {
    let taskElement = document.getElementById(taskElementId);
    taskItemContainer.removeChild(taskElement);
    let deleteElementIndex = taskItem.findIndex(function(eachItem) {
        let eachItemId = "taskElement" + eachItem.uniqueNo;
        if (eachItemId === taskElementId) {
            return true;
        } else {
            return false;
        }
    });
    taskItem.splice(deleteElementIndex, 1);
}

function createAddButtonTask(todo) {
    let taskElementId = "taskElement" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let checkBoxId = " check" + todo.uniqueNo;


    let taskElement = document.createElement("li");
    taskElement.classList.add("taskElement-container", "d-flex", "flex-row");
    taskElement.id = taskElementId;
    taskItemContainer.appendChild(taskElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkBoxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    taskElement.appendChild(inputElement);


    inputElement.onclick = function() {
        statusChange(checkBoxId, labelId, taskElementId);
    }

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    taskElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkBoxId);
    labelElement.classList.add("labelElement-box");
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    if (inputElement.checked === true) {
        labelElement.classList.add("label-text-changes");
    }
    labelContainer.appendChild(labelElement);
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteIcon(taskElementId);
    }
    deleteIconContainer.appendChild(deleteIcon);
}
for (let todo of taskItem) {
    createAddButtonTask(todo)

}

function AddItem() {
    let userInput = document.getElementById("userInput");
    let userInputValue = userInput.value;

    if (userInputValue === "") {
        alert("Enter the Input");
        return;
    }
    todoCount = todoCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    taskItem.push(newTodo);
    createAddButtonTask(newTodo);
    userInput.value = "";
}


AddButton.onclick = function() {
    AddItem()
}