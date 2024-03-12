import boardsSlice from '../../redux/boardsSlice';
import style from '../../style/deleteModal.module.scss';
import { useSelector, useDispatch } from 'react-redux';

export const DeleteBoard = ( { setWarningModalBoardOpen, setDropDownOpen }) => {

  const dispatch = useDispatch();
  const activeBoard = useSelector((state) => state.boards).find((board) => board.isActive);

  const handleDelete = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setWarningModalBoardOpen(false);
    setDropDownOpen(false);
  }

  return (
    <div className={style["modal-bg"]}>
        <div className={style.modal}>
            <h1>Delete this board?</h1>
            <p>Are you sure you want to delete the <span>‘{activeBoard.name}’</span> board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className={style.buttons}>
                 <button className={style["delete-btn"]}
                         onClick={() => handleDelete()}
                        >
                        Delete
                </button>
                <button className={style["cancel-btn"]}
                        onClick={() => setWarningModalBoardOpen(false)}
                        >
                        Cancel
                </button>
            </div>   
        </div>
      
    </div>
  )
}
