import React, {useState, useEffect} from 'react'
import style from '../../style/newTask.module.scss'
import iconCross from '../../assets/icon-cross.svg'
import { Select } from '../elements/select/Select'
import { useModal } from '../../context/ModalContext';
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';

export const NewTask = () => {

    useEffect(() => {
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = 'unset';
    }, []);

    const dispatch = useDispatch();
    const activeBoard = useSelector((state) => state.boards).find(
                (board) => board.isActive
        );
    const columns = activeBoard.columns;

    const { setAddTaskModalOpen } = useModal();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(activeBoard.columns[0].name);
    const [subtasks, setSubtasks] = useState([
        { title: "first task", isCompleted: false, id: uuid() },
        { title: "second task", isCompleted: false, id: uuid() },
    ]);

    const [newColIndex, setNewColIndex] = useState(0);
 
    const createNewTask = (e) => {
        dispatch(boardsSlice.actions.addNewTask({
                                                    title, 
                                                    description, 
                                                    status, 
                                                    subtasks, 
                                                    newColIndex
                                                }))
        e.preventDefault();
    };

    const addNewSubtask = (e) => {
        e.preventDefault();
        setSubtasks((state) => [
                            ...state,
                            { title: "", isCompleted: false, id: uuid() },
                        ]);
    };

    const removeSubtask = (id) => {
        setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
    };

    const subtaskHandle = (id, value) => {
        setSubtasks((prevState)=>{
            const newState = [...prevState];
            const subtask = newState.find((subtask) => subtask.id === id);
            subtask.title = value;
            return newState;
        })
    };

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
                        <input  type="text" 
                                placeholder='e.g.Take coffee break'
                                onChange={(e) => setTitle(e.target.value)}/>       
                    </div>
                    <div className={style.field}>
                        <label>Description</label>
                        <textarea   placeholder='e.g. It’s always good to take a break. This 
                                                15 minute break will  recharge the batteries 
                                                a little.' 
                                    onChange= {(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className={style.subtasks}>
                        <label>Subtasks</label>
                        {subtasks.map((subtask) => {
                            return (
                                <div>
                                    <input  type="text" 
                                            placeholder='' 
                                            onChange={(e) => subtaskHandle(subtask.id ,e.target.value)}/>
                                    <button onClick={() => removeSubtask(subtask.id)}>
                                        <img src={iconCross} alt="delete subtask"/>
                                    </button>
                                </div>
                            );  
                        })}
                        <button className={style["add-new-subtask-btn"]}
                                onClick={(e) => addNewSubtask(e)}>
                                + Add New Subtask
                        </button>
                    </div>
                
                    <div>
                        <label>Status</label>
                        <Select taskIndex={1} 
                                colIndex={1} 
                                status={status}
                                setStatus={setStatus}
                                newColIndex={newColIndex} 
                                setNewColIndex={setNewColIndex}/>
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
