// Function to add tasks
function addTask(day) {
    const taskInput = document.getElementById(`taskInput${day}`);
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
         // Create a new list item for the task
        const taskList = document.getElementById(`${day}Tasks`);
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.textContent = 'Delete Task';
        deleteTaskButton.classList.add('button', 'delete-button');
        deleteTaskButton.onclick = () => deleteTask(listItem);

        // Buttons for editing and deleting tasks
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('button', 'edit-button');
        editButton.onclick = () => editTask(listItem);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('button', 'delete-button');
        deleteButton.onclick = () => deleteTask(listItem);

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

         // Add the new task to the task list and clear the input
        taskList.appendChild(listItem);
        taskInput.value = '';

        saveTasksToLocalStorage();
    }
}

// Function to clear tasks for the day
function clearTasks(day) {
    if (confirm('Are you sure you want to clear all tasks for ' + day + '?')) {
        const taskList = document.getElementById(day + 'Tasks');
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        saveTasksToLocalStorage();
    }
}

// Function to delete notes for a specific day
function deleteNotes(day) {
    if (confirm('Are you sure you want to delete notes for ' + day + '?')) {
        const notesTextArea = document.getElementById(`notes${day}`);
        notesTextArea.value = ''; // Clear the notes textarea
        localStorage.removeItem(`${day}Notes`); // Remove notes from local storage
    }
}

// Function to save notes to local storage
function saveNotes(day) {
    const notesTextArea = document.getElementById(`notes${day}`);
    const notesText = notesTextArea.value.trim();
    localStorage.setItem(`${day}Notes`, notesText);
}

// Function to load notes from local storage
function loadNotesFromLocalStorage() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (const day of daysOfWeek) {
        const notesTextArea = document.getElementById(`notes${day}`);
        const storedNotes = localStorage.getItem(`${day}Notes`);
        if (storedNotes) {
            notesTextArea.value = storedNotes;
        }
    }
}

// Function to set mood color
function setMoodColor(day) {
    const moodSelect = document.getElementById(`mood${day}`);
    const moodColorDiv = document.getElementById(`moodColor${day}`);
    const selectedMood = moodSelect.value;
    
    moodColorDiv.className = 'mood-color';
    moodColorDiv.classList.add(selectedMood);

    // Save the selected mood to local storage if needed
    localStorage.setItem(`${day}Mood`, selectedMood);
}

// Function to load mood colors from local storage
function loadMoodColorsFromLocalStorage() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (const day of daysOfWeek) {
        const moodSelect = document.getElementById(`mood${day}`);
        const moodColorDiv = document.getElementById(`moodColor${day}`);
        const storedMood = localStorage.getItem(`${day}Mood`);
        if (storedMood) {
            moodSelect.value = storedMood;
            moodColorDiv.classList.add(storedMood);
        }
    }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (const day of daysOfWeek) {
        const taskList = document.getElementById(day + 'Tasks');
        const tasks = [];
        for (const taskItem of taskList.children) {
            tasks.push(taskItem.textContent);
        }
        localStorage.setItem(day, JSON.stringify(tasks));
    }
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    for (const day of daysOfWeek) {
        const taskList = document.getElementById(day + 'Tasks');
        const storedTasks = localStorage.getItem(day);
        if(storedTasks) {
            const tasks = JSON.parse(storedTasks);
            for (const taskText of tasks) {
                const listItem = document.createElement('li');
                listItem.textContent = taskText;

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('button', 'edit-button');
                editButton.onclick = () => editTask(listItem);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('button', 'delete-button');
                deleteButton.onclick = () => deleteTask(listItem);

                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);

                taskList.appendChild(listItem);
            }
        }
    }
}

// Function to delete a task
function deleteTask(taskItem) {
    if (confirm('Are you sure you want to delete this task?')) {
        const taskList = taskItem.parentElement; // Get the task's parent (ul)
        taskList.removeChild(taskItem); // Remove the task from the list
        saveTasksToLocalStorage();
    }
}

// Function to edit tasks
function editTask(taskItem) {
    const taskText = taskItem.textContent;
    const newText = prompt('Edit task: ', taskText);
    if (newText !== null) {
        taskItem.textContent = newText;
        saveTasksToLocalStorage();
    }
}

// Function to update the date and time
function updateDateTime() {
    const currentDateTime = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formattedDateTime = currentDateTime.toLocaleDateString('en-US', options);

    const dateTimeElement = document.getElementById('currentDateTime');
    dateTimeElement.textContent = formattedDateTime;
}

// Update the date and time immediately and then refresh it every second (1000 milliseconds)
updateDateTime();
setInterval(updateDateTime, 1000);


// Load tasks, notes, and mood colors from local storage when the page loads
loadTasksFromLocalStorage();
loadNotesFromLocalStorage();
loadMoodColorsFromLocalStorage();



