//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

let taskInput=document.getElementById("new-task");//Add a new task.
let addButton=document.getElementsByTagName("button")[0];//first button
let incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incompleteTasks
let completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
let createNewTaskElement=function(taskString){

    let listItem=document.createElement("li");

    //input (checkbox)
    let checkBox=document.createElement("input");//checkbx
    //label
    let label=document.createElement("label");//label
    //input (text)
    let editInput=document.createElement("input");//text
    //button.edit
    let editButton=document.createElement("button");//edit button
    //button.delete
    let deleteButton=document.createElement("button");//delete button
    let deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='task task-list__label';

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="task-list__checkbox";
    editInput.type="text";
    editInput.className="task";
    editInput.classList.add('task-list__input');
    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="task-edit btn";
    deleteButton.className="task-delete btn";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.setAttribute('alt', 'remove');
    deleteButtonImg.className="task-list__img";
    deleteButton.appendChild(deleteButtonImg);

    //and appending.
    listItem.className = "task-list__task";
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



let addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    let listItem=createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";

}

//Edit an existing task.

const editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    const listItem=this.parentNode;
    const editInput=listItem.querySelector('input[type=text]');
    const label=listItem.querySelector("label");
    const editBtn=listItem.querySelector(".task-edit");
    const containsClass=listItem.classList.contains("task-list__edit-mode");
    //If class of the parent is .edit-mode
    if(containsClass){

        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle("task-list__edit-mode");
};

//Delete task.
const deleteTask=function(){
    console.log("Delete Task...");

    const listItem=this.parentNode;
    const ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    const listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete=function(){
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    const listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.
//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    const checkBox=taskListItem.querySelector("input[type=checkbox]");
    const editButton=taskListItem.querySelector("button.task-edit");
    const deleteButton=taskListItem.querySelector("button.task-delete");

    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i=0; i<incompleteTaskHolder.children.length;i++){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.