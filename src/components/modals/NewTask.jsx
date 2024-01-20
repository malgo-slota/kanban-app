import React, {useState} from 'react'
import style from '../../style/newTask.module.scss'
import iconCross from '../../assets/icon-cross.svg'
import { Select } from '../elements/select/Select'
import { useModal } from '../../context/ModalContext';
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';

export const NewTask = () => {

    document.body.style.overflow = "hidden";

    const dispatch = useDispatch();
    const activeBoard = useSelector((state) => state.boards).find(
                (board) => board.isActive
        );
    const column = activeBoard.column;

    const { setAddTaskModalOpen } = useModal();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    //status first column name of the active board?
    const [subtasks, setSubtasks] = useState([
        { title: "first task", isCompleted: false, id: uuid() },
        { title: "second task", isCompleted: false, id: uuid() },
    ]);

    const [newColIndex, setNewColIndex] = useState(0);

    // const [status, setStatus] = useState(columns[prevColIndex].name);
 
    const createNewTask = (e) => {
        dispatch(boardsSlice.actions.addNewTask({title, description, status, subtasks, newColIndex}))
        e.preventDefault();
    }

      const addNewSubtask = (e) => {
        e.preventDefault();
        setSubtasks((state) => [
                            ...state,
                            { title: "", isCompleted: false, id: uuid() },
                        ]);
    };

    const removeSubtask = (id) => {
         setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
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
                        {subtasks.map((subtask) => {
                            return (
                                <div>
                                    <input type="text" placeholder='' />
                                    <button onClick={() => removeSubtask(subtask.id)}>
                                        <img src={iconCross} alt="delete subtask"/>
                                    </button>
                                </div>
                            );  
                        })}
                        <button className={style["add-new-subtask-btn"]}
                                onClick={(e) => addNewSubtask(e)}
                        >+ Add New Subtask</button>
                    </div>
                
                    <div>
                        <label>Status</label>
                        <Select taskIndex={1} colIndex={1} newColIndex={newColIndex} setNewColIndex={setNewColIndex}/>
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
