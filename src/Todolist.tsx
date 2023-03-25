import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterType } from "./App";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filterTasks: (value: FilterType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState("")
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onClickAddTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }
    const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    const onAllCLickHandler = () => props.filterTasks("all")
    const onActiveClickHandler = () => props.filterTasks("active")
    const onCompletedClickHandler = () => props.filterTasks("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                    onChange={onChangeTitleHandler}
                    onKeyDown={onEnterAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>


                {props.tasks.map(t => {
                    const removeTaskHandler = () => { props.removeTask(t.id) }
                    return <li>
                        <input type="checkbox" checked={t.isDone} />
                        <span>{t.title}</span>
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })}

            </ul>
            <div>
                <button onClick={onAllCLickHandler}>All</button>
                <button onClick={onActiveClickHandler} >Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}