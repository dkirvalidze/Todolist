import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    let tasks1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true },
        {id: 1, title: "JavaScript", isDone: true },
        {id: 1, title: "React", isDone: false }
    ]

    return (
        <div className="App">
        <Todolist title={"What to learn"} tasks={tasks1}/>
        </div>
    );
}

export default App;
