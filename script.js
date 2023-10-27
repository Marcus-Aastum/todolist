let tasklist = [];
if(localStorage.getItem("tasklist")){
    tasklist = JSON.parse(localStorage.getItem("tasklist"));
}
let deletedTasks = 0;
if(localStorage.getItem("deletedtasks")){
    deletedTasks = JSON.parse(localStorage.getItem("deletedtasks"));
}
function addTask(textContent){
    tasklist.push({id: tasklist.length, text: textContent, checked: false});
    document.getElementById("listItemContent").value = "";
    updateTasks()
}
function updateTasks(){
    taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";

    let numberOfChecked = 0;

    for (let index = 0; index < tasklist.length; index++) {
        if (!tasklist[index]){
            continue;
        }
        let listElement = document.createElement("li");
        listElement.id = "task_" + tasklist[index].id;
        let contentText = document.createTextNode(tasklist[index].text);
        
        let ptag = document.createElement("p");
        ptag.appendChild(contentText)

        let checkbox = document.createElement("input"); 
        checkbox.type = "checkbox";
        checkbox.setAttribute("onchange", "checkboxChange(this)");
        checkbox.id = "checkbox_" + tasklist[index].id;
        checkbox.className = "checkbox";
        
        let deletebutton = document.createElement("button");
        let deleteText = document.createTextNode("Delete");
        deletebutton.setAttribute("onclick", "deleteTask(this)");
        deletebutton.appendChild(deleteText);
        if(tasklist[index].checked){
            checkbox.checked = true;
            ptag.style.textDecoration = "line-through";
            numberOfChecked ++;
        }
        else{
            ptag.style.textDecoration = "none";
        }
        listElement.appendChild(checkbox);
        listElement.appendChild(ptag);
        listElement.appendChild(deletebutton);
        taskListElement.appendChild(listElement);        
    }
    document.getElementById("progressText").innerHTML = numberOfChecked + "/" + String(tasklist.length-deletedTasks) + " tasks completed";
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    localStorage.setItem("deletedtasks", JSON.stringify(deletedTasks));
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
            deletedTasks++;
            break;
        }
    }
    updateTasks();
}
updateTasks();
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    document.getElementById("appcontent").style.width = "80%"
  }