// API URL - adjust if needed
const API_URL = '/api/tasks';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
}

// Load all tasks from the API
async function loadTasks() {
    try {
        showLoading();
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error loading tasks:', error);
        showError('Failed to load tasks. Please try again.');
    }
}

// Display tasks in the UI
function displayTasks(tasks) {
    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <h3>No tasks yet!</h3>
                <p>Add your first task to get started.</p>
            </div>
        `;
        return;
    }

    tasksList.innerHTML = tasks.map(task => createTaskHTML(task)).join('');
    
    // Add event listeners to all checkboxes and delete buttons
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', toggleTask);
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', deleteTask);
    });
}

// Create HTML for a single task
function createTaskHTML(task) {
    return `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                data-id="${task.id}"
            />
            <span class="task-title">${escapeHtml(task.title)}</span>
            <div class="task-actions">
                <button class="btn btn-small btn-delete" data-id="${task.id}">Delete</button>
            </div>
        </div>
    `;
}

// Add a new task
async function addTask() {
    const title = taskInput.value.trim();
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });
        
        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        
        taskInput.value = '';
        await loadTasks();
    } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task. Please try again.');
    }
}

// Toggle task completion status
async function toggleTask(e) {
    const taskId = parseInt(e.target.dataset.id);
    const completed = e.target.checked;
    
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });
        
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        
        await loadTasks();
    } catch (error) {
        console.error('Error updating task:', error);
        alert('Failed to update task. Please try again.');
        e.target.checked = !completed; // Revert the checkbox
    }
}

// Delete a task
async function deleteTask(e) {
    const taskId = parseInt(e.target.dataset.id);
    
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        
        await loadTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
    }
}

// Show loading state
function showLoading() {
    tasksList.innerHTML = '<div class="loading">Loading tasks...</div>';
}

// Show error message
function showError(message) {
    tasksList.innerHTML = `
        <div class="empty-state">
            <h3>Error</h3>
            <p>${escapeHtml(message)}</p>
        </div>
    `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
