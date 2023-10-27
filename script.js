// Code by https://github.com/marcus-aastum
//Site can be reached at https://todolist.aastum.no

let tasklist = []; //List of all tasks
if(localStorage.getItem("tasklist")){ //checks if tasklist is in localstorage, and if so uses localstorage vlue
    tasklist = JSON.parse(localStorage.getItem("tasklist"));
}

let deletedTasks = 0; //Amount of tasks that have been deleted, used to check how many total tasks are in tasklist
if(localStorage.getItem("deletedtasks")){ //uses localstorage value if present
    deletedTasks = JSON.parse(localStorage.getItem("deletedtasks"));
}

//Function that pushes a new task to tasklist, triggered by form submit. Also clears input element
function addTask(textContent){
    tasklist.push({id: tasklist.length, text: textContent, checked: false});
    document.getElementById("listItemContent").value = "";
    updateTasks()
}

//Function that writes task to screen
function updateTasks(){

    //clears old ul of all tasks
    taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";

    let numberOfChecked = 0; //variable that checks how many tasks have been completed

    //For loop that loops through list of tasks to print them to website
    for (let index = 0; index < tasklist.length; index++) {

        //if current element of list doesn't exist, skip to next element
        if (!tasklist[index]){
            continue;
        }

        //Create li-element for task
        let listElement = document.createElement("li");
        listElement.id = "task_" + tasklist[index].id;

        //Create the text portion of the li-element, which contain the actual task
        let contentText = document.createTextNode(tasklist[index].text);
        let ptag = document.createElement("p");
        ptag.appendChild(contentText)

        //Create the checkbox to cross out task
        let checkbox = document.createElement("input"); 
        checkbox.type = "checkbox";
        checkbox.setAttribute("onchange", "checkboxChange(this)");
        checkbox.id = "checkbox_" + tasklist[index].id;
        checkbox.className = "checkbox";
        
        //create delete button to delete a task
        let deletebutton = document.createElement("button");
        let deleteText = document.createTextNode("Delete");
        deletebutton.setAttribute("onclick", "deleteTask(this)");
        deletebutton.appendChild(deleteText);

        //cross out task if it has been marked as completed
        if(tasklist[index].checked){
            checkbox.checked = true;
            ptag.style.textDecoration = "line-through";
            numberOfChecked ++;
        }
        else{
            ptag.style.textDecoration = "none";
        }

        //actually write the elements to the html-document
        listElement.appendChild(checkbox);
        listElement.appendChild(ptag);
        listElement.appendChild(deletebutton);
        taskListElement.appendChild(listElement);        
    }

    //update how many tasks have been completed
    document.getElementById("progressText").innerHTML = numberOfChecked + "/" + String(tasklist.length-deletedTasks) + " tasks completed";
    
    //Save items to localstorage for persistence
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    localStorage.setItem("deletedtasks", JSON.stringify(deletedTasks));
}

//function that gets called when a checkbox is changed, and marks the task as completed/not completed
function checkboxChange(checkbox){
    tasklist[checkbox.id.split("_")[1]].checked = checkbox.checked;
    updateTasks();  
}

//Function to delete tasks when delete button is pressed
function deleteTask(button){
    //for loop iterates through all tasks
    for (let index = 0; index < tasklist.length; index++) {
        //skip element if task does not exist
        if (!tasklist[index]){
            continue;
        }
        //delete task if id of parent list elements id of button (task_x) is the same as the current task in loop (x)
        if (tasklist[index].id == button.parentNode.id.split("_")[1]){
            delete tasklist[index];
            deletedTasks++; //updates amount of tasks that have been deleted
            break;
        }
    }
    updateTasks();
}
//writes tasks to screen when page is loaded
updateTasks();

//updates scaling in case css doesn't detect mobile platform
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    document.getElementById("appcontent").style.width = "80%"
  }