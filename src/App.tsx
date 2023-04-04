import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';
export type FilterType = "all" | "active" | "complete"




function App() {
    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JavaScript", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "Redux", isDone: false }
    ])
    let [filter, setFilter] = useState<FilterType>("all")
    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter((t) => !t.isDone)
    }
    if (filter === "complete") {
        tasksForTodolist = tasks.filter((t) => t.isDone)
    }

    function removeTask(id: string) {
        let remainingTasks = tasks.filter((t) => t.id !== id)
        setTasks(remainingTasks)
    }

    function filterTasks(value: FilterType) {
        setFilter(value)
    }

    function addTask(title: string) {
        let newTask = { id: v1(), title: title, isDone: false }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find((t) => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    return (
        <div>
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
