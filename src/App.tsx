import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JavaScript", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: number) {
        let filteredTasks = tasks.filter((t) => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter((t) => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter((t) => t.isDone)
    }
    
    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
