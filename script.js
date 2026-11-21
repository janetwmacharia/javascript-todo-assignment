
// Selecting HTML elements

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const emptyMessage = document.getElementById("emptyMessage");
const clearAllBtn = document.getElementById("clearAllBtn");

// Create an empty array to store tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Function to display tasks

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            displayTasks();
        });

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    taskCounter.textContent = "Total Tasks: " + tasks.length;

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
// Save tasks in localStorage

localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task

function addTask() {

    const task = taskInput.value.trim();

    if (task === "") {

        alert("Please enter a task!");

    } else {

        const newTask = {
            text: task,
            completed: false
        };

        tasks.push(newTask);

        taskInput.value = "";

        displayTasks();

    }

}

// Add event listener to the Add Task button

addTaskBtn.addEventListener("click", addTask);

// Clear all tasks

clearAllBtn.addEventListener("click", function() {

    tasks = [];

    displayTasks();

});

// Display tasks when the page loads

displayTasks();
