tasklist = [];
function createTaskList(textContent){
    tasklist.push({id: tasklist.length, text: textContent, checked: false});
    console.log(tasklist)
    updateTasks()
}
function updateTasks(){
    taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";
    
    for (let index = 0; index < tasklist.length; index++) {
        listElement = document.createElement("li");
        listElement.id = tasklist[index].id;
        contentText = document.createTextNode(tasklist[index].text);
        listElement.appendChild(contentText);
        taskListElement.appendChild(listElement);        
    }
}