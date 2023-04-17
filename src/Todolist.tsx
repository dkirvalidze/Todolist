import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";

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
    filter: FilterType
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
    let [taskTitle, setTaskTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value)
    }
    const onCLickHandler = () => {
        if (taskTitle !== "") {
            props.addTask(taskTitle)
            setTaskTitle("")
        } else {
            setError("Please fill out the form")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (taskTitle !== "") {
            if (e.key === "Enter") {
                props.addTask(taskTitle)
                setTaskTitle("")
            } else {
                setError("Please fill out the form")
            }
        }
    }

    const onAllClickHandler = () => props.filterTasks("all")
    const onActiveClickHandler = () => props.filterTasks("active")
    const onCompleteClickHandler = () => props.filterTasks("complete")
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={onCLickHandler}>+
                </button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onClickRemoveTask = () => props.removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type={"checkbox"} checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickRemoveTask}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === "all" ? "active-filter" : ""}>
                    All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === "active" ? "active-filter" : ""}>
                    Active
                </button>
                <button onClick={onCompleteClickHandler}
                        className={props.filter === "complete" ? "active-filter" : ""}>
                    Complete
                </button>
            </div>
        </div>
    )
}
