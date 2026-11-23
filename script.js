
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

    // Clear the existing task list
    taskList.innerHTML = "";

    // Loop through all tasks
    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        // Create checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.setAttribute(
            "aria-label",
            "Mark " + task.text + " as completed"
        );


        // Create task text
        const taskText = document.createElement("span");

        taskText.textContent = task.text;

        // Check if task is completed
        if (task.completed) {
            taskText.classList.add("completed");
        }


        // Create Edit button
        const editBtn = document.createElement("button");

        editBtn.type = "button";
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.setAttribute(
            "aria-label",
            "Edit task: " + task.text
        );


        // Create Delete button
        const deleteBtn = document.createElement("button");

        deleteBtn.type = "button";
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.setAttribute(
            "aria-label",
            "Delete task: " + task.text
        );


        // Mark task as completed
        checkbox.addEventListener("change", function() {

            tasks[index].completed = checkbox.checked;

            displayTasks();

        });


        // Edit an existing task
        editBtn.addEventListener("click", function() {

            const updatedTask = prompt(
                "Edit your task:",
                task.text
            );

            // Check if user cancelled
            if (updatedTask === null) {
                return;
            }

            // Prevent empty tasks
            if (updatedTask.trim() === "") {

                alert("Task cannot be empty!");

                return;
            }

            tasks[index].text = updatedTask.trim();

            displayTasks();

        });


        // Delete a task
        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            displayTasks();

        });


        // Add elements to the task
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        // Add task to the list
        taskList.appendChild(li);

    });


    // Update total task counter
    taskCounter.textContent = "Total Tasks: " + tasks.length;


    // Display empty message when there are no tasks
    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";


    // Disable Clear All button when there are no tasks
    clearAllBtn.disabled = tasks.length === 0;


    // Save tasks in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

}



// Function to add a new task
function addTask() {

    const task = taskInput.value.trim();


    // Validate task input
    if (task === "") {

        alert("Please enter a task!");

        return;
    }


    // Create a new task object
    const newTask = {

        text: task,

        completed: false

    };


    // Add task to the array
    tasks.push(newTask);


    // Clear the input field
    taskInput.value = "";


    // Display updated tasks
    displayTasks();


    // Return focus to the input
    taskInput.focus();

}



// Add event listener to Add Task button
addTaskBtn.addEventListener("click", addTask);


// Allow users to add tasks by pressing Enter
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Clear all tasks
clearAllBtn.addEventListener("click", function() {

    tasks = [];

    displayTasks();

});


// Display tasks when the page loads
displayTasks();
