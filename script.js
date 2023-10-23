let tasklist = [];
function createTaskList(textContent){
    tasklist.push({id: tasklist.length, text: textContent, checked: false});
    document.getElementById("listItemContent").value = "";
    updateTasks()
}
function updateTasks(){
    taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";

    for (let index = 0; index < tasklist.length; index++) {
        if (!tasklist[index]){
            continue;
        }
        let listElement = document.createElement("li");
        listElement.id = "task_" + tasklist[index].id;
        let contentText = document.createTextNode(tasklist[index].text);
        
        let checkbox = document.createElement("input"); 
        checkbox.type = "checkbox";
        checkbox.setAttribute("onchange", "checkboxChange(this)");
        checkbox.id = "checkbox_" + tasklist[index].id;
        
        let deletebutton = document.createElement("button");
        let deleteText = document.createTextNode("Delete");
        deletebutton.setAttribute("onclick", "deleteTask(this)");
        deletebutton.appendChild(deleteText);
        if(tasklist[index].checked){
            checkbox.checked = true;
            listElement.style.textDecoration = "line-through";
        }
        else{
            listElement.style.textDecoration = "none";
        }
        listElement.appendChild(checkbox);
        listElement.appendChild(contentText);
        listElement.appendChild(deletebutton);
        taskListElement.appendChild(listElement);        
    }
}
function checkboxChange(checkbox){
    tasklist[checkbox.id.split("_")[1]].checked = checkbox.checked;
    updateTasks();  
}
function deleteTask(button){
    for (let index = 0; index < tasklist.length; index++) {
        if (!tasklist[index]){
            continue;
        }
        if (tasklist[index].id == button.parentNode.id.split("_")[1]){
            delete tasklist[index];
            break;
        }
    }
    updateTasks();
}