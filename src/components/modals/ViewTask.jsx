import React, { useState } from 'react';
import style from '../../style/viewTask.module.scss';
import verticalEllipsis from '../../assets/icon-vertical-ellipsis.svg';
import { Select } from '../elements/select/Select';
import { DropDown } from './DropDown';
import { useBoards } from '../../context/BoardsContext';

export const ViewTask = ( { taskIndex, colIndex }) => {

    document.body.style.overflow = "hidden";

    const [taskMenuOpen, setTaskMenuOpen] = useState(false);
    const { activeBoard } = useBoards();
    // const task = activeBoard.columns.tasks.filter((task, i) => i === taskIndex);

    const columns = activeBoard.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const subtasks = task.subtasks;

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


                {/* <div className={style.subtask}>
                    <input type="checkbox" id="one"></input>
                    <label htmlFor='one'>Research competitor pricing and business models</label>
                   
                </div>
                <div className={style.subtask}>
                    <input type="checkbox" id="two"></input>
                    <label htmlFor='two'>Outline a business model that works for our solution</label>
                     
                </div>
                <div className={style.subtask}>
                    <input type="checkbox" id="three"></input>
                    <label htmlFor='three'>Surveying and testing</label>
                </div> */}
            </div>
            <div className={style["current-status"]}>
                <p className={style["main-label"]}>Current Status</p>
                <Select colIndex={colIndex} taskIndex={taskIndex} col={col} task={task}/>
            </div>
        </div>

    </div>
  )
}
