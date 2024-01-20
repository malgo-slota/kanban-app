import React, { useState } from 'react';
import style from '../../style/viewTask.module.scss';
import verticalEllipsis from '../../assets/icon-vertical-ellipsis.svg';
import { Select } from '../elements/select/Select';
import { DropDown } from './DropDown';
import { useSelector } from 'react-redux';

export const ViewTask = ( { taskIndex, colIndex }) => {

    document.body.style.overflow = "hidden";

    const [taskMenuOpen, setTaskMenuOpen] = useState(false);
    const activeBoard = useSelector((state) => state.boards).find(
                    (board) => board.isActive
    );
    const columns = activeBoard.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const subtasks = task.subtasks;
    const [currentStatus, setCurrentStatus] = useState(task.status);

  return (
    <div className={style["modal-bg"]}>
        <div className={style.modal}>
            <div className={style.header}>
                <h1>{task.title}</h1>
                {/* <h1>Research pricing points of various competitors and trial different business models</h1> */}
                <button onClick={() => setTaskMenuOpen(!taskMenuOpen)}><img src={verticalEllipsis} alt="open dropdown menu"/></button>
                {taskMenuOpen ? <DropDown /> : ''}
            </div>
            <p>{task.description}</p>
            <div>
                <p className={style["main-label"]}>Subtasks (2 of {subtasks.length})</p>
                {subtasks.map((subtask) => {
                    return (
                        <div className={style.subtask}>
                            <input type="checkbox" id="one" checked={subtask.isCompleted}></input>
                            <label htmlFor='one'>{subtask.title}</label>
                        </div>
                    );
                   
                })}
            </div>
            <div className={style["current-status"]}>
                <p className={style["main-label"]}>Current Status</p>
                <Select prevColIndex={colIndex} taskIndex={taskIndex} currentStatus={currentStatus}/>
            </div>
        </div>

    </div>
  )
}
