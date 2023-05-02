import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterType } from "./App";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type PropsType = {
    tlID: string
    title: string
    tasks: TaskType[]
    removeTask: (tID: string, tlID: string) => void
    removeTodolist: (tlID: string) => void
    filterTasks: (value: FilterType, tlID: string) => void
    filter: FilterType
    addTask: (title: string, tlID: string) => void
    changeTaskStatus: (tID: string, isDone: boolean, tlID: string) => void
}
export function Todolist(props: PropsType) {
    let [taskTitle, setTaskTitle] = useState("")
    let [error, setError] = useState<null | string>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const addTaskOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (taskTitle.trim() !== "") {
            if (e.key === "Enter") {
                props.addTask(taskTitle.trim(), props.tlID)
                setTaskTitle("")
            }
        } else {
            setError("Please fill out the form")
        }
    }
    const addTaskBtn = () => {
        if (taskTitle.trim() !== "") {
            props.addTask(taskTitle.trim(), props.tlID)
            setTaskTitle("")
        } else {
            setError("Please fill out the form")
        }
    }

    const filterAllBtn = () => props.filterTasks("all", props.tlID)
    const filterActiveBtn = () => props.filterTasks("active", props.tlID)
    const filterCompleteBtn = () => props.filterTasks("complete", props.tlID)
    const removeTlBtn = () => props.removeTodolist(props.tlID)
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTlBtn}> x </button>
            </h3>
            <div>
                <input value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyDown={addTaskOnKeyPress}
                    className={error ? "error" : ""} />
                <button onClick={addTaskBtn}>+
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const removeTaskBtn = () => props.removeTask(t.id, props.tlID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.tlID)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type={"checkbox"}
                            checked={t.isDone}
                            onChange={onChangeHandler}
                        />
                        <span>{t.title}</span>
                        <button onClick={removeTaskBtn}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={filterAllBtn}
                    className={props.filter === "all" ? "active-filter" : ""}>
                    All
                </button>
                <button onClick={filterActiveBtn}
                    className={props.filter === "active" ? "active-filter" : ""}>
                    Active
                </button>
                <button onClick={filterCompleteBtn}
                    className={props.filter === "complete" ? "active-filter" : ""}>
                    Complete
                </button>
            </div>
        </div>
    )
}
