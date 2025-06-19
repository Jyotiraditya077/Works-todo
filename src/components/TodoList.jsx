import React, { useEffect, useState } from "react";
import "../App.css";

const TodoList = () => {
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem("sortOrder") || "recent";
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todoData");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("sortOrder", sortOrder);
  }, [sortOrder]);

  const addTask = () => {
    if (input.trim() === "") {
      alert("You must write something!");
      return;
    }
    const newTask = { text: input.trim(), checked: false };
    setTasks((prev) => [...prev, newTask]);
    setInput("");
  };

  const toggleChecked = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const displayedTasks =
    sortOrder === "recent" ? [...tasks].reverse() : tasks;

  return (
    <div className="container">
      <div className="todo-app">
        <h2>
          To-Do List <img src="/images/icon.png" alt="icon" />
        </h2>

        <div className="filter-bar">
          <div className="simple-dropdown">
            <div className="dropdown-label">Sort ▾</div>
            <div className="dropdown-options">
              <div
                className={sortOrder === "recent" ? "active-option" : ""}
                onClick={() => setSortOrder("recent")}
              >
                Recently Added
              </div>
              <div
                className={sortOrder === "oldest" ? "active-option" : ""}
                onClick={() => setSortOrder("oldest")}
              >
                Oldest First
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <input
            type="text"
            placeholder="Add your text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>

        {tasks.length === 0 && (
          <p className="empty-message">Set your goals for today</p>
        )}

        <ul id="list-container">
          {displayedTasks.map((task, index) => (
            <li
              key={index}
              className={task.checked ? "checked" : ""}
              onClick={() =>
                toggleChecked(
                  sortOrder === "recent"
                    ? tasks.length - 1 - index
                    : index
                )
              }
            >
              {task.text}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(
                    sortOrder === "recent"
                      ? tasks.length - 1 - index
                      : index
                  );
                }}
              >
                ×
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
