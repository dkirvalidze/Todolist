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


    function removeTask(id: string, tlId: string) {
        // let remainingTasks = tasks.filter((t) => t.id !== id)
        // setTasks(remainingTasks)
        let remainingTasks = tasks[tlId].filter((t) => t.id !== id)
        tasks[tlId] = remainingTasks
        setTasks({ ...tasks })

    }

    function removeTodolist(tlId: string) {
        let remainingTodolists = todolists.filter((t) => t.id !== tlId)
        setTodolists(remainingTodolists)
        delete tasks[tlId]
        setTasks({ ...tasks })
    }

    function filterTasks(value: FilterType, tlId: string) {
        let todolist = todolists.find((tl) => tl.id === tlId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function addTask(title: string, tlId: string) {
        // let newTask = { id: v1(), title: title, isDone: false }
        // let newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
        let newTask = { id: v1(), title: title, isDone: false }
        tasks[tlId] = [newTask, ...tasks[tlId]]
        setTasks({ ...tasks })
    }

    function changeTaskStatus(id: string, isDone: boolean, tlId: string) {
        // let task = tasks.find((t) => t.id === id)
        // if (task) {
        //     task.isDone = isDone
        // }
        // setTasks([...tasks])
        let task = tasks[tlId].find((t) => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({ ...tasks })
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: "Todolist 1", filter: "active" },
        { id: todolistId2, title: "Todolist 2", filter: "complete" }
    ])
    let [tasks, setTasks] = useState({
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JavaScript", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Redux", isDone: false }
        ],
        [todolistId2]: [
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
                    tasksForTodolist = tasks[tl.id].filter((t) => !t.isDone)
                }
                if (tl.filter === "complete") {
                    tasksForTodolist = tasks[tl.id].filter((t) => t.isDone)
                }
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    removeTodolist={removeTodolist}
                    filterTasks={filterTasks}
                    addTask={addTask}
                    filter={tl.filter}
                    changeTaskStatus={changeTaskStatus}
                />
            })}
        </div>
    );
}

export default App;
