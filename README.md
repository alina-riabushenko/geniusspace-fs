# geniusspace-fs
Full Stack Course - Task Manager Application

A complete fullstack web application demonstrating modern web development practices with Node.js, Express, and Vanilla JavaScript.

## 🚀 Features

- **RESTful API** - Backend built with Express.js
- **CRUD Operations** - Create, Read, Update, and Delete tasks
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Clean and intuitive user interface
- **Real-time Updates** - Dynamic content without page reloads

## 📁 Project Structure

```
geniusspace-fs/
├── backend/
│   └── server.js          # Express server and API routes
├── public/
│   ├── index.html         # Main HTML page
│   ├── css/
│   │   └── styles.css     # Application styles
│   └── js/
│       └── app.js         # Frontend JavaScript
├── package.json           # Project dependencies
└── README.md             # This file
```

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- CORS middleware

### Frontend
- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/alina-riabushenko/geniusspace-fs.git
   cd geniusspace-fs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📡 API Endpoints

### Get all tasks
- **GET** `/api/tasks`
- Returns an array of all tasks

### Get a single task
- **GET** `/api/tasks/:id`
- Returns a specific task by ID

### Create a new task
- **POST** `/api/tasks`
- Body: `{ "title": "Task title" }`
- Returns the created task

### Update a task
- **PUT** `/api/tasks/:id`
- Body: `{ "title": "New title", "completed": true }`
- Returns the updated task

### Delete a task
- **DELETE** `/api/tasks/:id`
- Returns 204 No Content on success

## 💡 Usage

1. **Add a Task**: Enter a task in the input field and click "Add Task" or press Enter
2. **Complete a Task**: Click the checkbox next to a task to mark it as completed
3. **Delete a Task**: Click the "Delete" button to remove a task

## 🔧 Development

To run the server in development mode:
```bash
npm run dev
```

## 📝 License

ISC

## 👥 Contributing

This is a learning project for a fullstack course. Feel free to fork and experiment!
