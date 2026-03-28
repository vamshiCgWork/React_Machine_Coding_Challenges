import React, { useEffect, useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("saved_todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("saved_todos", JSON.stringify(todos));
  }, [todos]);
  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    const toggle = todos.map((todo) => {
      if (todo.id == id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(toggle);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id != id);
    setTodos(updatedTodos);
  };

  return (
    <div className="challenge-container">
      <div className="todo">
        <h2>Todo List</h2>

        <div className="todo-input">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button onClick={addTodo} disabled={inputValue ? false : true}>
            Add
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && <p>No tasks yet! Add one above.</p>}
      </div>
    </div>
  );
}
