import React from 'react'
import iconCross from '../../assets/icon-cross.svg'
import style from './editTask.module.scss'
import { Select } from '../elements/select/Select'

export const EditTask = () => {

  return (
    <div className={style["modal-bg"]}>
        <div className={style.modal}>
            <div className={style.header}>
                 <h1>Edit Task</h1>
            </div>
            <div className={style["task-info"]}>
                <div>
                    <label>Title</label>
                    <input type="text" placeholder='e.g.Take coffee break'/>       
                </div>
                <div>
                    <label>Description</label>
                    <textarea placeholder='e.g. It’s always good to take a break. This 
                        15 minute break will  recharge the batteries 
                        a little.' />
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
            <button className={style["create-task-btn"]}>Create Task</button>
        </div>
    </div>
  )
}
