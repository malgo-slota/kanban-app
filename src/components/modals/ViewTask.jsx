import { useState } from 'react';
import style from '../../style/viewTask.module.scss';
import verticalEllipsis from '../../assets/icon-vertical-ellipsis.svg';
import { Select } from '../elements/select/Select';
import { DropDown } from './DropDown';
import { useSelector } from 'react-redux';
import { EditTask } from './EditTask';
import { createPortal } from 'react-dom';
import { Subtask } from './Subtask';
import { useDispatch } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';

export const ViewTask = ({  taskIndex, 
                            colIndex, 
                            setViewTaskOpen, 
                            viewTaskOpen, 
                            completedCounter,
                        }) => {

    const dispatch = useDispatch();
    const [dropdownOpen, setDropDownOpen] = useState(false);
    const activeBoard = useSelector((state) => state.boards).find((board) => board.isActive);
    const columns = activeBoard.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const subtasks = task.subtasks;
    const [status, setStatus] = useState(task.status);
    const [newColIndex, setNewColIndex] = useState(colIndex);
    const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
    
    const setOpenEditModal = () => {
        setEditTaskModalOpen(true);
        setDropDownOpen(false)
    };

    const setOpenDeleteModal = () => {
        setDropDownOpen(false)
        // setIsDeleteModalOpen(true)
    };

     const changeTaskStatus = () => {
         dispatch(boardsSlice.actions.setNewTaskStatus({
            status,
            colIndex, 
            taskIndex,
            newColIndex,
        }));
      }

  return (
    <div className={style["modal-bg"]}
            onClick={(e) => {
                                if (e.target !== e.currentTarget) {
                                    return;
                                }
                                setViewTaskOpen(!viewTaskOpen);
                                changeTaskStatus();
                            }}>
        <div className={style.modal}>
            <div className={style.header}>
                <h1>{task.title}</h1>
                <button onClick={() => setDropDownOpen(!dropdownOpen)}>
                    <img src={verticalEllipsis} alt="open dropdown menu"/>
                </button>
                {dropdownOpen ? <DropDown   editTaskmodalOpen={editTaskModalOpen} 
                                            setEditTaskModalOpen={setEditTaskModalOpen} 
                                            type="Task" 
                                            colIndex={colIndex} taskIndex={taskIndex}
                                            setOpenEditModal={setOpenEditModal}
                                            setOpenDeleteModal={setOpenDeleteModal}
                                            /> : ''}
                {editTaskModalOpen ? createPortal(
                                            <EditTask   taskIndex={taskIndex} 
                                                        colIndex={colIndex} 
                                                        setNewColIndex={setNewColIndex}
                                                        setEditTaskModalOpen={setEditTaskModalOpen}
                                                        status={status}
                                                        setStatus={setStatus}/>,
                                            document.body
                ) : ''}
            </div>
            <p>{task.description}</p>
            <div>
                <p className={style["main-label"]}>
                    Subtasks ({completedCounter} of {subtasks.length})
                </p>
                {subtasks.map((subtask, index) => {
                    return (
                        <Subtask taskIndex={taskIndex} colIndex={colIndex} subtaskIndex={index}/>
                    );
                })}
            </div>
            <div className={style["current-status"]}>
                <p className={style["main-label"]}>
                    Current Status
                </p>
            
                <Select status={status}
                        setStatus={setStatus} 
                        setNewColIndex={setNewColIndex}/>
            </div>
        </div>
    </div>
  )
}
