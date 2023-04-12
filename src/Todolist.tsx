import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filterTasks: (value: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(newTaskTitle.trim() !== "") {
            if (e.key === "Enter") {
                props.addTask(newTaskTitle.trim())
                setNewTaskTitle("")
            } else {
                setError("Please fill out the form")
            }
        }
    }
    const onClickAddTask = () => {
            if(newTaskTitle.trim() !== "") {
                props.addTask(newTaskTitle.trim())
                setNewTaskTitle("")
            } else {
                setError("Please fill out the form")
            }
    }

    const onAllClickHandler = () => props.filterTasks("all")
    const onActiveClickHandler = () => props.filterTasks("active")
    const onCompleteClickHandler = () => props.filterTasks("complete")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyPressHandler}
                    className={error? "error" : ""}
                />
                <button
                    onClick={onClickAddTask}
                >+
                </button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onClickRemoveHandler = () => props.removeTask(t.id)
                    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=> props.changeTaskStatus(t.id, e.currentTarget.checked)
                    return (
                        <li key={t.id}
                            className={t.isDone? "is-done" : ""}
                        >
                            <input type="checkbox" checked={t.isDone}
                                   onChange={onChangeHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={onClickRemoveHandler}>x</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button onClick={onAllClickHandler}
                className={props.filter ==="all"? "active-filter" : ""}
                >
                    All
                </button>
                <button
                    onClick={onActiveClickHandler}
                    className={props.filter === "active" ? "active-filter" : ""}
                >
                    Active
                </button>
                <button
                    onClick={onCompleteClickHandler}
                    className={props.filter === "complete" ? "active-filter" : ""}
                >
                    Complete
                </button>
            </div>
        </div>
    )
}
