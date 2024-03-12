import React, { useState } from 'react'
import iconCross from '../../assets/icon-cross.svg'
import style from '../../style/editTask.module.scss'
import { Select } from '../elements/select/Select'
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';
import { v4 as uuid } from "uuid";

export const EditTask = ({taskIndex, colIndex, setEditTaskModalOpen, status, setStatus, setNewColIndex}) => {

    const dispatch = useDispatch();
    const activeBoard = useSelector((state) => state.boards).find(
                (board) => board.isActive
        );
    const task = activeBoard.columns[colIndex].tasks[taskIndex];

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [subtasks, setSubtasks] = useState(task.subtasks);

    const changeTask = (e) => {
        e.preventDefault();
        dispatch(boardsSlice.actions.editTask({
                                                title, 
                                                description, 
                                                subtasks, 
                                                status,
                                                colIndex, 
                                                taskIndex
                                            }))
    };

    const addNewSubtask = (e) => {
        e.preventDefault();
        setSubtasks((state) => [
                            ...state,
                            { title: "", isCompleted: false, id: uuid() },
                        ]);
    };

    const removeSubtask = (id) => {
         setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
    };

    const subtaskHandle = (id, value) => {
            setSubtasks((prevState)=>{
            const newState = [...prevState];
            const subtask = newState.find((subtask) => subtask.id === id);
            subtask.title = value;
            return newState;
        })
    };
    
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
                    <input  type="text" 
                            placeholder={title}
                            onChange={(e) => setTitle(e.target.value)}/>       
                </div>
                <div>
                    <label>Description</label>
                    <textarea   placeholder={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                </div>
            </div>
            <div className={style.subtasks}>
                <label>Subtasks</label>
                {subtasks.map((subtask)=> {
                    return (
                         <div>
                            <input  type="text" 
                                    placeholder={subtask.title} 
                                    onChange={(e) => subtaskHandle(subtask.id ,e.target.value)}/>
                            <button onClick={() => removeSubtask(subtask.id)}>
                                <img src={iconCross} />
                            </button>
                        </div>
                    );
                })}
                <button className={style["add-new-subtask-btn"]}
                        onClick={(e) => addNewSubtask(e)}>
                        + Add New Subtask
                </button>
            </div>
            <div>
                <label>Status</label>
                <Select status={status} setStatus={setStatus} setNewColIndex={setNewColIndex}/>
            </div>
            <button className={style["create-task-btn"]}
                    onClick={(e)=>changeTask(e)}>
                    Save change
            </button>
        </div>
    </div>
  )
}
