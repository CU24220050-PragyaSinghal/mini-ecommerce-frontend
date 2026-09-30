// script.js
const API_URL = 'http://localhost:5000/api/tasks';

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const listEl = document.getElementById('task-list');

async function fetchTasks() {
    loadingEl.style.display = 'block';
    errorEl.textContent = '';
    listEl.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const tasks = await response.json();
        
        loadingEl.style.display = 'none';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.title} - [${task.completed ? 'Completed' : 'Pending'}]`;
            listEl.appendChild(li);
        });
    } catch (err) {
        loadingEl.style.display = 'none';
        errorEl.textContent = `Connection Failed: Unable to reach the server. (${err.message})`;
    }
}

fetchTasks();