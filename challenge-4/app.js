const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyListOnTaskList = document.querySelector(".empty-list");
const addButton = document.getElementById("addButton");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

let uniqueIdGenerateForCHeckbox = 0;

function updateTaskStats() {
    const NumberOfCompleteTask = document.querySelectorAll(".completed");
    totalTasks.innerText = `Total tasks: ${taskList.childElementCount}`;
    completedTasks.innerText = `Completed: ${NumberOfCompleteTask.length}`;
}

addButton.addEventListener("click", () => {
    // Check validation
    if (taskInput.value === "" || taskInput.value.trim() === "") {
        alert("Write your first task");
        taskInput.value = "";
        return;
    }

    // Create task item li element
    const createLi = document.createElement("li");
    createLi.className = "task-item";

    // Create checkbox input element with unique id
    const createCheckbox = document.createElement("input");
    uniqueIdGenerateForCHeckbox++;
    const checkboxId = `task-checkbox-${uniqueIdGenerateForCHeckbox}`;
    const setCheckboxAttributes = {
        type: "checkbox",
        id: checkboxId,
        className: "complete-checkbox",
    };
    Object.assign(createCheckbox, setCheckboxAttributes);

    // Create task text paragraph element
    const createTaskText = document.createElement("p");
    createTaskText.className = "task-text";
    createTaskText.innerText = taskInput.value.trimStart();

    // Create delete button element
    const createButton = document.createElement("button");
    createButton.className = "delete-button";
    createButton.innerText = "Delete";

    createLi.append(createCheckbox, createTaskText, createButton);

    taskList.appendChild(createLi);

    // Remove empty list li element
    if (emptyListOnTaskList && emptyListOnTaskList.parentNode) {
        emptyListOnTaskList.parentNode.removeChild(emptyListOnTaskList);
    }

    // Another methods

    /*
        if (emptyListOnTaskList) {
            emptyListOnTaskList.remove();
        }

    and

        if (emptyListOnTaskList && taskList.contains(emptyListOnTaskList)) {
            taskList.removeChild(emptyListOnTaskList);
        }
    */

    // Reset value on task input
    taskInput.value = "";

    // Update task stats
    updateTaskStats();

    createCheckbox.addEventListener("change", () => {
        createLi.classList.toggle("completed");
        updateTaskStats();
    });

    createButton.addEventListener("click", function () {
        this.parentNode.remove();
        updateTaskStats();

        if (taskList.childElementCount === 0) {
            taskList.appendChild(emptyListOnTaskList);
        }
    });
});
