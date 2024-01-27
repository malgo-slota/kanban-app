import React, { useState, useEffect } from 'react';
import style from '../../style/viewTask.module.scss';
import verticalEllipsis from '../../assets/icon-vertical-ellipsis.svg';
import { Select } from '../elements/select/Select';
import { DropDown } from './DropDown';
import { useSelector } from 'react-redux';
import { EditTask } from './EditTask';
import { createPortal } from 'react-dom';

export const ViewTask = ( { taskIndex, colIndex, setViewTaskOpen, viewTaskOpen }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);

    const [dropdownOpen, setDropDownOpen] = useState(false);
    const activeBoard = useSelector((state) => state.boards).find(
                    (board) => board.isActive
    );
    const columns = activeBoard.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const subtasks = task.subtasks;
    const [status, setStatus] = useState(task.status);
    const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);

    const setOpenEditModal = () => {
        setEditTaskModalOpen(true);
        setDropDownOpen(false)
    };

    const setOpenDeleteModal = () => {
        setDropDownOpen(false)
        // setIsDeleteModalOpen(true)
    };

  return (
    <div className={style["modal-bg"]}
            onClick={(e) => {
                                if (e.target !== e.currentTarget) {
                                    return;
                                }
                                setViewTaskOpen(!viewTaskOpen);
                            }}>
        <div className={style.modal}>
            <div className={style.header}>
                <h1>{task.title}</h1>
                <button onClick={() => setDropDownOpen(!dropdownOpen)}>
                    <img src={verticalEllipsis} alt="open dropdown menu"/>
                </button>
                {dropdownOpen ? <DropDown   editTaskmodalOpen={editTaskModalOpen} 
                                            setEditTaskModalOpen={setEditTaskModalOpen} 
                                            type="Task" 
                                            colIndex={colIndex} taskIndex={taskIndex}
                                            setOpenEditModal={setOpenEditModal}
                                            setOpenDeleteModal={setOpenDeleteModal}
                                            /> : ''}
                {editTaskModalOpen ? createPortal(
                                            <EditTask   taskIndex={taskIndex} 
                                                        colIndex={colIndex} 
                                                        setEditTaskModalOpen={setEditTaskModalOpen}
                                                        status={status}
                                                        setStatus={setStatus}/>,
                                            document.body
                ) : ''}
            </div>
            <p>{task.description}</p>
            <div>
                <p className={style["main-label"]}>
                    Subtasks (2 of {subtasks.length})
                </p>
                {subtasks.map((subtask) => {
                    return (
                        <div className={style.subtask}>
                            <input  type="checkbox" 
                                    id="one" 
                                    defaultChecked={subtask.isCompleted}/>
                            <label htmlFor='one'>
                                {subtask.title}
                            </label>
                        </div>
                    );
                })}
            </div>
            <div className={style["current-status"]}>
                <p className={style["main-label"]}>
                    Current Status
                </p>
                <Select prevColIndex={colIndex} 
                        taskIndex={taskIndex} 
                        status={status}
                        setStatus={setStatus}/>
            </div>
        </div>
    </div>
  )
}
