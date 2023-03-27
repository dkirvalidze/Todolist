import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterType } from "./App";
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filterTasks: (value: FilterType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState("")
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const onClickAddTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
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

                />
                <button
                    onClick={onClickAddTask}
                >+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onClickRemoveHandler = () => props.removeTask(t.id)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={onClickRemoveHandler}>x</button>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompleteClickHandler}>Complete</button>
            </div>
        </div>
    )
}
