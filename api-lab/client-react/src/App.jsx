import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* 
  NOTE ON AXIOS VS FETCH:
  1. Automatic Parsing: Axios automatically parses JSON response payloads into JavaScript objects (no need for response.json()).
  2. Error Handling: Axios rejects the promise for bad HTTP status codes (like 404 or 500), whereas fetch() only rejects on network errors.
  3. Configuration: Axios allows custom instance defaults and interceptors for headers like x-api-key.
*/

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_KEY = 'my-super-secret-key-123'; // Matches your backend server .env file

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  // 1. Fetch tasks on component mount using Axios
  useEffect(() => {
    axios.get(`${API_URL}/tasks`)
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || err.message);
        setLoading(false);
      });
  }, []);

  // 2. Handle POST (Create a new task)
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/tasks`, 
        { title: newTitle, completed: false },
        { headers: { 'x-api-key': API_KEY } }
      );
      setTasks([...tasks, res.data]); // Update UI state immediately
      setNewTitle(''); // Clear input field
    } catch (err) {
      alert(`Failed to add task: ${err.response?.data?.error || err.message}`);
    }
  };

  // 3. Handle DELETE (Remove an existing task)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { 'x-api-key': API_KEY }
      });
      setTasks(tasks.filter(task => task.id !== id)); // Remove from UI state
    } catch (err) {
      alert(`Failed to delete task: ${err.response?.data?.error || err.message}`);
    }
  };

  // Render conditional states
  if (loading) return <div style={{ margin: '40px', fontSize: '18px' }}>Loading tasks...</div>;
  if (error) return <div style={{ margin: '40px', color: 'red', fontSize: '18px' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Task Manager Mini App (React)</h2>

      {/* Task Creation Form */}
      <form onSubmit={handleAddTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="New task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ padding: '8px', width: '70%', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 12px', cursor: 'pointer' }}>Add Task</button>
      </form>

      {/* Task List Display */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
            <span>{task.title} — <em>{task.completed ? 'Completed' : 'Pending'}</em></span>
            <button 
              onClick={() => handleDelete(task.id)}
              style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;