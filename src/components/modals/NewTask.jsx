import React from 'react'
import style from './newTask.module.scss'
import iconCross from '../../assets/icon-cross.svg'
import { Select } from '../elements/select/Select'

export const NewTask = () => {

        document.body.style.overflow = "hidden";

  return (
    <div className={style["modal-bg"]}>
    <div className={style.modal}>
    <div className={style.content}>
        <h1>Add New Task</h1>
        <div className={style.field}>
            <label>Title</label>
            <input type="text" placeholder='e.g.Take coffee break'/>       
        </div>
        <div className={style.field}>
            <label>Description</label>
            <textarea placeholder='e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little.' />
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
        <button className={style["create-task-btn"]}>Create Task</button>
    </div>
    </div>
    </div>
  )
}
