import React, {useState} from 'react'
import style from '../../style/dropDopwn.module.scss';
import { EditBoard } from './EditBoard';
import { EditTask } from './EditTask';

export const DropDown = ({setModalOpen, modalOpen, type, colIndex, taskIndex}) => {

      document.body.style.overflow = "hidden";

  return (
    <div className={style.modal}>
        <button  onClick={()=>setModalOpen(true)}>
          Edit {type}
        </button>
        <button className={style["delete-btn"]}>
          Delete {type}
        </button>

        {modalOpen && type === "Board" ? <EditBoard /> : ""}
        {modalOpen && type === "Task" ? <EditTask taskIndex={taskIndex} colIndex={colIndex} setModalOpen={setModalOpen}/> : ""}

    </div>
  )
}
