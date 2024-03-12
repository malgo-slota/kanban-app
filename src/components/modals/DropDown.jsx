import {useState} from 'react'
import style from '../../style/dropDopwn.module.scss';
import { EditBoard } from './EditBoard';
import { DeleteBoard } from './DeleteBoard';
import { DeleteTask } from './DeleteTask';

export const DropDown = ({
                        setEditTaskModalOpen, 
                        type, 
                        colIndex, 
                        taskIndex, 
                        editBoardModalOpen,
                        setEditBoardModalOpen,
                        setDropDownOpen,
                      }) => {

  const [warningModalBoardOpen, setWarningModalBoardOpen] = useState(false);
  const [warningModalTaskOpen, setWarningModalTaskOpen] = useState(false);

  const handleDelete = (type) => {
    if (type === 'Board') {
        setWarningModalBoardOpen(true);
    } else if (type === 'Task') {
        setWarningModalTaskOpen(true);
    }
  }

  const handleEdit = (type) => {
    if (type === 'Board') {
       setEditBoardModalOpen(true)
    } else if (type === 'Task'){
      setEditTaskModalOpen(true)
    }
  }

  return (
    <div className={style.modal}>
        <button  onClick={()=> handleEdit(type)}>
          Edit {type}
        </button>
        <button className={style["delete-btn"]}
                onClick={()=>handleDelete(type)}>
          Delete {type}
        </button>

        {type === "Board" && editBoardModalOpen ? <EditBoard setEditBoardOpen={setEditBoardModalOpen}/> : ""}
        {/* editTask modal is opened from viewTask modal */}
        {/* {editTaskModalOpen && type === "Task" ? <EditTask taskIndex={taskIndex} colIndex={colIndex} setEditTaskModalOpen={setEditTaskModalOpen}/> : ""} */}
        {warningModalBoardOpen ? <DeleteBoard   setDropDownOpen={setDropDownOpen} 
                                                setWarningModalBoardOpen={setWarningModalBoardOpen}
                                                /> : ''}
   
        {warningModalTaskOpen ? <DeleteTask setDropDownOpen={setDropDownOpen}
                                            setWarningModalTaskOpen={setWarningModalTaskOpen} 
                                            colIndex={colIndex}
                                            taskIndex={taskIndex} 
                                            /> : ''}
    </div>
  )
}
