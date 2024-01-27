import React, { useState } from 'react'
import iconCross from '../../assets/icon-cross.svg'
import style from '../../style/editTask.module.scss'
import { Select } from '../elements/select/Select'
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';

export const EditTask = ({taskIndex, colIndex, setEditTaskModalOpen}) => {

    const dispatch = useDispatch();
    const activeBoard = useSelector((state) => state.boards).find(
                (board) => board.isActive
        );
    const task = activeBoard.columns[colIndex].tasks[taskIndex];

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [subtasks, setSubtasks] = useState(task.subtasks);

    const changeTask = (e) => {
        e.preventDefault();
        dispatch(boardsSlice.actions.editTask({title, description, colIndex, taskIndex}))
    }
    
  return (
    <div className={style["modal-bg"]}
        onClick={(e) => {
                            if (e.target !== e.currentTarget) {
                                return;
                            }
                            setEditTaskModalOpen(false);
                        }}>
        <div className={style.modal}>
            <div className={style.header}>
                 <h1>Edit Task</h1>
            </div>
            <div className={style["task-info"]}>
                <div>
                    <label>Title</label>
                    <input type="text" placeholder={title}
                            onChange={(e) => setTitle(e.target.value)}/>       
                </div>
                <div>
                    <label>Description</label>
                    <textarea placeholder={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                </div>
            </div>
            <div className={style.subtasks}>
                <label>Subtasks</label>
                <div>
                    <input type="text" placeholder='e.g. Make coffee' />
                    <button><img src={iconCross} /></button>
                </div>
                <div>
                    <input type="text" placeholder='e.g. Drink coffee & smile'/>
                    <button><img src={iconCross} /></button>
                </div>
                <button className={style["add-new-subtask-btn"]}>+ Add New Subtask</button>
            </div>
            <div>
                <label>Status</label>
                <Select />
            </div>
            <button className={style["create-task-btn"]}
                    onClick={(e)=>changeTask(e)}>
                Save change
            </button>
        </div>
    </div>
  )
}
