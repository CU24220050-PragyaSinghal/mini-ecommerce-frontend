
import { useEffect, useRef, useState } from "react";
import "./App.css";

// Q1. Counter
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section className="question">
      <h2>Q1. Counter</h2>
      <h3>Count: {count}</h3>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button
        onClick={() => setCount(count - 1)}
        disabled={count === 0}
      >
        Decrement
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </section>
  );
}

// Q2. Todo List
function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  function addTodo() {
    const item = input.trim();

    if (item === "") return;

    setTodos([
      ...todos,
      { id: Date.now() + Math.random(), text: item },
    ]);

    setInput("");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <section className="question">
      <h2>Q2. Todo List</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a todo item"
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Q3. Login Toggle
function LoginToggle() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <section className="question">
      <h2>Q3. Login Toggle</h2>

      {loggedIn ? (
        <>
          <h3>Welcome! You are logged in.</h3>
          <button onClick={() => setLoggedIn(false)}>
            Logout
          </button>
        </>
      ) : (
        <button onClick={() => setLoggedIn(true)}>
          Login
        </button>
      )}
    </section>
  );
}

// Q4. Live Search Filter
function LiveSearch() {
  const [search, setSearch] = useState("");

  const names = [
    "Aarav",
    "Priya",
    "Rahul",
    "Pragya",
    "Ananya",
    "Rohan",
    "Neha",
    "Arjun",
    "Kavya",
    "Amit",
  ];

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="question">
      <h2>Q4. Live Search Filter</h2>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search names..."
      />

      {filteredNames.length > 0 ? (
        <ul>
          {filteredNames.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </section>
  );
}

// Q5. Stopwatch
function Stopwatch() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const startTime = useRef(0);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setElapsedMs(Date.now() - startTime.current);
    }, 100);

    return () => clearInterval(timer);
  }, [running]);

  function start() {
    if (running) return;

    startTime.current = Date.now() - elapsedMs;
    setRunning(true);
  }

  function pause() {
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    setElapsedMs(0);
    startTime.current = 0;
  }

  return (
    <section className="question">
      <h2>Q5. Stopwatch</h2>

      <h3>{(elapsedMs / 1000).toFixed(1)} seconds</h3>

      <button onClick={start} disabled={running}>
        Start
      </button>

      <button onClick={pause} disabled={!running}>
        Pause
      </button>

      <button onClick={reset}>Reset</button>
    </section>
  );
}

// Display all five questions
function App() {
  return (
    <main className="container">
      <h1>React Assignment</h1>

      <Counter />
      <TodoList />
      <LoginToggle />
      <LiveSearch />
      <Stopwatch />
    </main>
  );
}

export default App;
