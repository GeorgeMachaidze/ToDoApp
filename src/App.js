import './App.css';

import React, { useState } from 'react';
import logo from "./images/TODO.png";
import sun from "./images/icon-sun.svg";
import moon from "./images/icon-moon.svg"

function App() {

  
  const [checked, setChecked] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [todos, setTodos] = useState([]);

  function addTodo(todoText) {
    if(todoText.trim() !== ""){
      const newTodo = {id: Date.now(), text: todoText, completed: checked};
      setTodos([...todos, newTodo]);
      console.log("Added Todo:", newTodo);
      console.log("All Todos:", todos);
    }
  }
  function changeCircle() {
   setChecked(!checked)
  }
  function makeDark(){
  setIsDark(!isDark)
  }

  return (
    <div className={isDark ? "app dark" : 'app'}  >
      <div className={isDark ? "app dark" : ""}>
        <div className='headText'>
        <img src={logo} alt="TODO" />
  
            <img onClick={() => makeDark() } width = "20px" height = "20px" src={ isDark ? sun : moon}/>
      
        </div>
        <div className='input' style={{backgroundColor: isDark ? "rgba(37, 39, 61, 1)" : "white"}}>
          <div className='circle' onClick={() => changeCircle()} style={{ backgroundColor: checked ? "#55DDFF" : "transparent" }}>
          {checked ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg> 
      ) : ""}
          </div>
          
          <input className="mainInput" type="text" placeholder='Create a new todo...' 
          style={{backgroundColor: isDark ? "rgba(37, 39, 61, 1)" : "transparent", color: isDark ? "rgba(200, 203, 231, 1)" : "rgba(200, 203, 231, 1)" }}
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              addTodo(e.target.value);
              e.target.value = "";
            }
          }}/>
        </div>
      

      {todos.length > 0 &&( <div className='toDos' style={{backgroundColor: isDark ? "#25273D" : "white",boxShadow: isDark ? "0px 35px 50px -15px rgba(0, 0, 0, 0.5)" : "0px 35px 50px -15px rgba(194, 195, 214, 0.5)" }}>
          {todos.map(todo => (
            <div className="toDo"key={todo.id}>
              <div className='checkAndText'>
              <div className='circle' onClick={() => changeCircle()} style={{ backgroundColor: checked ? "#55DDFF" : "transparent" }}>
            {checked ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg> 
        ) : ""}
            </div>
            <div className='toDoText'style={{color: isDark ? "#C8CBE7" : "#494C6B"}}>{todo.text}</div>
            </div>
            <svg className='cross' xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            <hr style={{backgroundColor: isDark ? "#393A4B" : "#E3E4F1"}}/>
            </div>
          ))}
        </div>
        )}
     </div>
    </div>
  );
}

export default App;
