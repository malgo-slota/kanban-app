import React, {useState} from 'react'
import style from '../../style/dropDopwn.module.scss';
import { EditBoard } from './EditBoard';
import { EditTask } from './EditTask';

export const DropDown = ({
                        editTaskModalOpen, 
                        setEditTaskModalOpen, 
                        type, 
                        colIndex, 
                        taskIndex, 
                        setOpenEditModal,
                        editBoardModalOpen,
                        setEditBoardModalOpen
                      }) => {

  return (
    <div className={style.modal}>
        <button  onClick={()=>setOpenEditModal()}>
          Edit {type}
        </button>
        <button className={style["delete-btn"]}>
          Delete {type}
        </button>

        {type === "Board" ? <EditBoard setEditBoardOpen={setEditBoardModalOpen}/> : ""}
        {/* {editTaskModalOpen && type === "Task" ? <EditTask taskIndex={taskIndex} colIndex={colIndex} setEditTaskModalOpen={setEditTaskModalOpen}/> : ""} */}

    </div>
  )
}
