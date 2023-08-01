import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import logo from "./images/TODO.png";
import sun from "./images/icon-sun.svg";
import moon from "./images/icon-moon.svg";

function App() {
  const [response, setResponse] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://todoapp-ep3t.onrender.com/api/todos"
      );
      setResponse(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const [isDark, setIsDark] = useState(false);

  const [status, setStatus] = useState("all");
  const [checkedTodo, setCheckedTodo] = useState(false);
  const completedTodos = response.filter((response) => response.completed);
  const activeTodos = response.filter((response) => !response.completed);
  const array =
    status === "all"
      ? response
      : status === "active"
      ? activeTodos
      : completedTodos;
  console.log(response);
  function addTodo(todoText) {
    if (todoText.trim() !== "") {
      const newTodo = { text: todoText, active: checkedTodo };
      axios
        .post("https://todoapp-ep3t.onrender.com/api/todos", newTodo)
        .then((res) => {
          console.log(res.data);
          setResponse([
            ...response,
            {
              text: res.data.text,
              completed: res.data.active,
              id: res.data.id,
            },
          ]);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    if (checkedTodo) {
      let newTodo = { id: Date.now(), text: todoText, completed: true };
      setResponse([...response, newTodo]);
    }
  }
  function inputCheck() {
    setCheckedTodo(!checkedTodo);
  }
  function deleteTodo(id) {
    const updatedTodos = response.filter((response) => response.id !== id);
    setResponse(updatedTodos);
  }
  function deleteComplated() {
    const filteredTodos = response.filter((response) => !response.completed);
    setResponse(filteredTodos);
  }
  function changeCircle(id) {
    setResponse(
      response.map((todo) => {
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
          <img src={logo} alt="TODO" onClick={() => window.location.reload()} />

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

        {response.length > 0 && (
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
              {array.map((response) => (
                <div className="toDo" key={response.id}>
                  <div className="checkAndText">
                    <div
                      className="circle"
                      onClick={() => changeCircle(response.id)}
                      style={{
                        background: response.completed
                          ? "linear-gradient(rgba(85, 221, 255, 1), rgba(192, 88, 243, 1))"
                          : "transparent",
                      }}
                    >
                      {response.completed ? (
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
                        textDecorationLine: response.completed
                          ? "line-through"
                          : "none",
                        color:
                          response.completed && !isDark
                            ? "#D1D2DA"
                            : !response.completed && isDark
                            ? "#C8CBE7"
                            : response.completed && isDark
                            ? "#494C6B"
                            : "#494C6B",
                      }}
                    >
                      {response.text}
                    </div>
                  </div>
                  <svg
                    onClick={() => deleteTodo(response.id)}
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
                <p className="clear" onClick={() => deleteComplated()}>
                  Clear Completed
                </p>
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
                onClick={() => setStatus("active")}
                style={{ color: status === "active" ? "#3A7CFD" : "#9495A5" }}
              >
                Active
              </h1>
              <h1
                onClick={() => setStatus("completed")}
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
