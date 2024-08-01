import {useState} from 'react'
import style from '../../style/dropDopwn.module.scss';
import { EditBoard } from './EditBoard';
import { DeleteBoard } from './DeleteBoard';
import { DeleteTask } from './DeleteTask';
import { useSelector } from 'react-redux';

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

  const theme = useSelector(status => status.theme);

  const handleDelete = (type) => {
    if (type === 'Board') {
        setWarningModalBoardOpen(true);
    } else if (type === 'Task') {
        setWarningModalTaskOpen(true);
    }
  }

  const handleEdit = (type) => {
    if (type === 'Board') {
      setEditBoardModalOpen(true);
       
    } else if (type === 'Task'){
      setEditTaskModalOpen(true)
    }
  }

  return (
    <div className={type === 'Task' ? 

                      `${theme === "dark" ? 
                          `${style["modal-dark"]} ${style.modal}` : `${style.modal} ${style["modal-type-task"]}`}` 

                      : `${theme === "dark" ? 
                          `${style["modal-dark"]} ${style.modal}` : style.modal}`
                          
                      }>

    {/* <div className={style.modal}> */}
        <button  onClick={()=> handleEdit(type)}>
          Edit {type}
        </button>
        <button className={style["delete-btn"]}
                onClick={()=>handleDelete(type)}>
          Delete {type}
        </button>

        {type === "Board" && editBoardModalOpen ? <EditBoard setEditBoardOpen={setEditBoardModalOpen} setDropDownOpen={setDropDownOpen}/> : ""}
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
