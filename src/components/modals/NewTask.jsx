import React, {useState} from 'react'
import style from '../../style/newTask.module.scss'
import iconCross from '../../assets/icon-cross.svg'
import { Select } from '../elements/select/Select'
import { useModal } from '../../context/ModalContext';
import { v4 as uuid } from "uuid";

export const NewTask = () => {

    document.body.style.overflow = "hidden";

    const { setAddTaskModalOpen } = useModal();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);
    const [subtasks, setSubtasks] = useState([
        { title: "first task", isCompleted: false, id: uuid() },
        { title: "second task", isCompleted: false, id: uuid() },
    ]);

    const createNewTask = (e) => {
        e.preventDefault();
    }

    return (
        <div className={style["modal-bg"]}
                onClick={(e) => {
                            if (e.target !== e.currentTarget) {
                                return;
                            }
                            setAddTaskModalOpen(false);
                        }}>
            <div className={style.modal}>
                <div className={style.content}>
                    <h1>Add New Task</h1>
                    <div className={style.field}>
                        <label>Title</label>
                        <input type="text" placeholder='e.g.Take coffee break'
                                onChange= {(e) => setTitle(e.target.value)}/>       
                    </div>
                    <div className={style.field}>
                        <label>Description</label>
                        <textarea placeholder='e.g. It’s always good to take a break. This 
                                                15 minute break will  recharge the batteries 
                                                a little.' 
                                onChange= {(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className={style.subtasks}>
                        <label>Subtasks</label>
                        <div>
                            <input type="text" placeholder='e.g. Make coffee' />
                            <button><img src={iconCross} alt="delete subtask"/></button>
                        </div>
                        <div>
                            <input type="text" placeholder='e.g. Drink coffee & smile'/>
                            <button><img src={iconCross} alt="delete subtask"/></button>
                        </div>
                        <button className={style["add-new-subtask-btn"]}>+ Add New Subtask</button>
                    </div>
                
                    <div>
                        <label>Status</label>
                        {/* <Select /> */}
                    </div>
                    <button className={style["create-task-btn"]}
                            onClick={(e) => createNewTask(e)}>
                                Create Task
                    </button>
                </div>
            </div>
        </div>
  )
}
