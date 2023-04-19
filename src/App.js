import "./App.css";

import React, { useState } from "react";
import logo from "./images/TODO.png";
import sun from "./images/icon-sun.svg";
import moon from "./images/icon-moon.svg";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [checkedTodo, setCheckedTodo] = useState(false);
  const completedTodos = todos.filter((todo) => todo.completed);
  const activeTodos = todos.filter((todo) => !todo.completed);
  const array =
    status === "all"
      ? todos
      : status === "active"
      ? activeTodos
      : completedTodos;

  function addTodo(todoText) {
    if (todoText.trim() !== "") {
      let newTodo = { id: Date.now(), text: todoText, completed: false };
      setTodos([...todos, newTodo]);
    }
    if (checkedTodo) {
      let newTodo = { id: Date.now(), text: todoText, completed: true };
      setTodos([...todos, newTodo]);
    }
  }
  function inputCheck() {
    setCheckedTodo(!checkedTodo);
  }
  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  function deleteComplated() {
    const filteredTodos = todos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  }
  function changeCircle(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  }
  function makeDark() {
    setIsDark(!isDark);
  }

  return (
    <div className={isDark ? "app dark" : "app"}>
      <div className={isDark ? "app dark" : "app"}>
        <div className="headText">
          <img src={logo} alt="TODO"
          onClick={() => window.location.reload()}
          />

          <img
            onClick={() => makeDark()}
            width="20px"
            height="20px"
            src={isDark ? sun : moon}
          />
        </div>
        <div
          className="input"
          style={{ backgroundColor: isDark ? "rgba(37, 39, 61, 1)" : "white" }}
        >
          <div
            className="circle"
            onClick={() => inputCheck()}
            style={{
              background: checkedTodo
                ? "linear-gradient(rgba(85, 221, 255, 1), rgba(192, 88, 243, 1))"
                : "transparent",
            }}
          >
            {checkedTodo ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                <path
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                  d="M1 4.304L3.696 7l6-6"
                />
              </svg>
            ) : (
              ""
            )}
          </div>

          <input
            className="mainInput"
            type="text"
            placeholder="Create a new todo..."
            style={{
              backgroundColor: isDark ? "rgba(37, 39, 61, 1)" : "transparent",
              color: isDark
                ? "rgba(200, 203, 231, 1)"
                : "rgba(200, 203, 231, 1)",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>

        {todos.length > 0 && (
          <div>
            <div
              className="toDos"
              style={{
                backgroundColor: isDark ? "#25273D" : "white",
                boxShadow: isDark
                  ? "0px 35px 50px -15px rgba(0, 0, 0, 0.5)"
                  : "0px 35px 50px -15px rgba(194, 195, 214, 0.5)",
              }}
            >
              {array.map((todo) => (
                <div className="toDo" key={todo.id}>
                  <div className="checkAndText">
                    <div
                      className="circle"
                      onClick={() => changeCircle(todo.id)}
                      style={{
                        background: todo.completed
                          ? "linear-gradient(rgba(85, 221, 255, 1), rgba(192, 88, 243, 1))"
                          : "transparent",  
                      }}
                    >
                      {todo.completed ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="9"
                        >
                          <path
                            fill="none"
                            stroke="#FFF"
                            strokeWidth="2"
                            d="M1 4.304L3.696 7l6-6"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="toDoText"
                      style={{
                      textDecorationLine: todo.completed ? "line-through" : "none",
                      color: todo.completed && !isDark ? "#D1D2DA" : !todo.completed && isDark ? "#C8CBE7" : todo.completed && isDark ? "#494C6B" : "#494C6B"
                    }}
                      
                    >
                      {todo.text}
                    </div>
                  </div>
                  <svg
                    onClick={() => deleteTodo(todo.id)}
                    className="cross"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                  >
                    <path
                      fill="#494C6B"
                      fillRule="evenodd"
                      d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                    />
                  </svg>
                  <hr
                    style={{ backgroundColor: isDark ? "#393A4B" : "#E3E4F1" }}
                  />
                </div>
              ))}
              <div
                className="toDoFooter"
                style={{ color: isDark ? "#5B5E7E" : "#9495A5" }}
              >
                <p>{array.length} items left</p>
                <p className="clear" onClick={() => deleteComplated()}>Clear Completed</p>
              </div>
            </div>
            <div
              className="footer"
              style={{
                backgroundColor: isDark ? "#25273D" : "white",
                boxShadow: isDark
                  ? "0px 35px 50px -15px rgba(0, 0, 0, 0.5)"
                  : "0px 35px 50px -15px rgba(194, 195, 214, 0.5)",
              }}
            >
              <h1
                onClick={() => setStatus("all")}
                style={{ color: status == "all" ? "#3A7CFD" : "#9495A5" }}
              >
                All
              </h1>
              <h1
                onClick={() => {
                  if (activeTodos.length >= 1) {
                    setStatus("active");
                  }
                }}
                style={{ color: status === "active" ? "#3A7CFD" : "#9495A5" }}
              >
                Active
              </h1>
              <h1
                onClick={() => {
                  if (completedTodos.length >= 1) {
                    setStatus("completed");
                  }
                }}
                style={{ color: status == "completed" ? "#3A7CFD" : "#9495A5" }}
              >
                Completed
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
