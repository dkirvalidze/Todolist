import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, Todolist } from './Todolist';
export type FilterType = "all" | "active" | "complete"
type TodolistType = {
    id: string
    title: string
    filter: FilterType
}



function App() {
    function removeTask(tID: string, tlID: string) {
        let remainingTasks = tasks[tlID].filter((t) => t.id !== tID)
        tasks[tlID] = remainingTasks
        setTasks({ ...tasks })
    }
    function removeTodolist(tlID: string) {
        let remainingTodolists = todolists.filter((tl) => tl.id !== tlID)
        setTodolists(remainingTodolists)
        delete tasks[tlID]
        setTasks({ ...tasks })
    }
    function filterTasks(value: FilterType, tlID: string) {
        let todolist = todolists.find((tl) => tl.id === tlID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    function addTask(title: string, tlID: string) {
        let newTask = { id: v1(), title: title, isDone: false }
        tasks[tlID] = [newTask, ...tasks[tlID]]
        setTasks({ ...tasks })
    }
    function changeTaskStatus(tId: string, isDone: boolean, tlID: string) {
        let task = tasks[tlID].find((t) => t.id === tId)
        if (task) {
            task.isDone = isDone
            setTasks({ ...tasks })
        }
    }

    let tlID1 = v1()
    let tlID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: tlID1, title: "To-Do List 1", filter: "all" },
        { id: tlID2, title: "To-Do List 2", filter: "all" }
    ])

    let [tasks, setTasks] = useState({
        [tlID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JavaScript", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Redux", isDone: false }
        ],
        [tlID2]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JavaScript", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Redux", isDone: false }
        ]
    })

    return (
        <div>
            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone)
                }
                if (tl.filter === "complete") {
                    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone)
                }
                return <Todolist
                    key={tl.id}
                    tlID={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    removeTodolist={removeTodolist}
                    filterTasks={filterTasks}
                    filter={tl.filter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                />
            })}

        </div>
    );
}

export default App;

