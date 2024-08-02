import style from '../../style/editBoard.module.scss';
import iconCross from '../../assets/icon-cross.svg'
import boardsSlice from '../../redux/boardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { v4 as uuid } from "uuid";
import setDotColor from '../../utils/dotColor';

export const EditBoard = ({ setEditBoardOpen, setDropDownOpen }) => {
    
    const activeBoard = useSelector((state) => state.boards).find((board) => board.isActive);
    const columns = activeBoard.columns;

    const theme = useSelector(state => state.theme);
    const [newBoardName, setNewBoardName] = useState(activeBoard.name);
    const [updatedColumns, setUpdatedColumns] = useState(columns);

    const dispatch = useDispatch();

    const [isFirstLoad, setIsFirstLoad] = useState(true);

    if (isFirstLoad) {
        setUpdatedColumns(
          columns.map((col) => {
            return { ...col, id: uuid() };
          })
        );
        setNewBoardName(activeBoard.name);
        setIsFirstLoad(false);
      }

    const handleChange = () => {
        dispatch(boardsSlice.actions.editBoard({
                        newBoardName,
                        updatedColumns,
        }));
        setEditBoardOpen(false);
        // setDropDownOpen(false);
    };

    const addColumn = (e) => {
        e.preventDefault();
        setUpdatedColumns((state) => [
                            ...state,
                            { name: "", tasks: [], id: uuid() },
                        ]);
        setDotColor();
    };

    const onDelete = (id) => {
        setUpdatedColumns((prevState) => prevState.filter((column) => column.id !== id));
      };

     const columnsHandle = (id, value) => {
            setUpdatedColumns((prevState)=>{
            const newState = [...prevState];
            const column = newState.find((column) => column.id === id);
            column.name = value;
            return newState;
        });
    };
        
  return (
    <div className={style["modal-bg"]}
            onClick={(e) => {
                                if (e.target !== e.currentTarget) {
                                    return;
                                }
                                setEditBoardOpen(false);
                            }}
                            >
        <div className={theme === 'dark' ? `${style.modal} ${style["modal-dark"]}` : style.modal}>
            <p>Edit Board</p>
            <div className={style["board-columns"]}>
                <label>Board Name</label>
                <input  type="text" 
                        onChange={(e)=>setNewBoardName(e.target.value)}/>
            </div>
            <div className={style["board-columns"]}>
                <label>Board Columns</label>
                {updatedColumns.map((column, index) => (
                    <div key={index}>
                        <input  type="text" 
                                placeholder={column.name} 
                                onChange={(e) => columnsHandle(column.id ,e.target.value)}/>
                        <button>
                            <img src={iconCross}  
                                    onClick={() => {onDelete(column.id)}}
                                 alt="delete column"/>
                        </button>
                    </div>
                ))}
                <button className={style["add-new-column-btn"]}
                        onClick={(e) => {addColumn(e)}}>
                        + Add New Column
                </button>
            </div>
            <button className={style["save-changes-btn"]}
                    onClick={()=> handleChange()}>
                    Save Changes
            </button>
        </div>
    </div>
  )
}
