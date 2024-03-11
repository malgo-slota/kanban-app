import React, {useState} from 'react'
import style from '../../style/dropDopwn.module.scss';
import { EditBoard } from './EditBoard';
import { EditTask } from './EditTask';
import { DeleteBoard } from './DeleteBoard';

export const DropDown = ({
                        editTaskModalOpen, 
                        setEditTaskModalOpen, 
                        type, 
                        colIndex, 
                        taskIndex, 
                        editBoardModalOpen,
                        setEditBoardModalOpen,
                        setDropDownOpen,
                      }) => {

  const [warningModalOpen, setWarningModalOpen] = useState(false);

  const handleDeleteBoard = () => {
    setWarningModalOpen(true);
  }

  return (
    <div className={style.modal}>
        <button  onClick={()=>setEditBoardModalOpen(true)}>
          Edit {type}
        </button>
        <button className={style["delete-btn"]}
                onClick={()=>handleDeleteBoard()}
                >
          Delete {type}
        </button>

        {type === "Board" && editBoardModalOpen ? <EditBoard setEditBoardOpen={setEditBoardModalOpen}/> : ""}
        {/* {editTaskModalOpen && type === "Task" ? <EditTask taskIndex={taskIndex} colIndex={colIndex} setEditTaskModalOpen={setEditTaskModalOpen}/> : ""} */}

        {warningModalOpen ? <DeleteBoard  setDropDownOpen={setDropDownOpen} 
                                          setWarningModalOpen={setWarningModalOpen}/> : ''}
    </div>
  )
}
