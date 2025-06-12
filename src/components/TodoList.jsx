import React, { useEffect, useState } from "react";
import "../App.css";

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todoData");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") {
      alert("You must write something!");
      return;
    }
    setTasks([...tasks, { text: input.trim(), checked: false }]);
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

  return (
    <div className="container">
      <div className="todo-app">
        <h2>
          To-Do List <img src="/images/icon.png" alt="icon" />
        </h2>
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
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.checked ? "checked" : ""}
              onClick={() => toggleChecked(index)}
            >
              {task.text}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
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
