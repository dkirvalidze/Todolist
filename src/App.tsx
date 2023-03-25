import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JavaScript", isDone: true },
        { id: v1(), title: "React", isDone: false },
        { id: v1(), title: "Redux", isDone: false }
    ])



    let [filter, setFilter] = useState<FilterType>("all")

    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)

    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }


    function removeTask(id: string) {
        let exactTasks = tasks.filter(t => t.id !== id)
        setTasks(exactTasks)

    }
    function filterTasks(value: FilterType) {
        setFilter(value)
    }
    function addTask(title: string) {
        let newTask = { id: v1(), title: title, isDone: false }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
            />

        </div>
    );
}

export default App;
