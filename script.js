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
        let listElement = document.createElement("li");
        listElement.id = "task_" + tasklist[index].id;
        let contentText = document.createTextNode(tasklist[index].text);
        listElement.appendChild(contentText);

        let checkbox = document.createElement("input"); 
        checkbox.type = "checkbox";
        checkbox.setAttribute("onchange", "checkboxChange(this)");
        checkbox.id = "checkbox_" + tasklist[index].id;
        if(tasklist[index].checked){
            checkbox.checked = true;
            listElement.style.textDecoration = "line-through";
        }
        else{
            listElement.style.textDecoration = "none";
        }
        listElement.appendChild(checkbox);
        taskListElement.appendChild(listElement);        
    }
}
function checkboxChange(checkbox){
    tasklist[checkbox.id.split("_")[1]].checked = checkbox.checked;
    updateTasks();
}