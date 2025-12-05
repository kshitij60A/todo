// Load tasks from localStorage if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Display existing tasks
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        
        li.addEventListener('click', () => toggleComplete(index));
        taskList.appendChild(li);
    });
    
    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        displayTasks();
    }
}

// Toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

// Delete a task
function deleteTask(index) {
    event.stopPropagation(); // Prevent toggling completion when deleting
    tasks.splice(index, 1);
    displayTasks();
}

// Add task when pressing Enter
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initial display
displayTasks();
