import style from '../../style/deleteModal.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';

export const DeleteTask = ( {colIndex, taskIndex, setWarningModalTaskOpen, setDropDownOpen }) => {

  const dispatch = useDispatch();
  const activeBoard = useSelector((state) => state.boards).find((board) => board.isActive);
     
   const handleDelete = () => {
    dispatch(boardsSlice.actions.deleteTask({
                      colIndex,
                      taskIndex
        }))
    setWarningModalTaskOpen(false);
    // setDropDownOpen(false);
  }

  return (
    <div className={style["modal-bg"]}>
        <div className={style.modal}>
            <h1>Delete this task?</h1>
            <p>Are you sure you want to delete the <span>`{activeBoard.columns[colIndex].tasks[taskIndex].title}`</span> task and its subtasks? This action cannot be reversed.</p>
            <div className={style.buttons}>
                 <button  className={style["delete-btn"]}
                          onClick={() => handleDelete()}>
                          Delete
                </button>
                <button className={style["cancel-btn"]}
                        onClick={() =>  setWarningModalTaskOpen(false)}>
                        Cancel
                </button>
            </div>   
        </div>
      
    </div>
  )
}
