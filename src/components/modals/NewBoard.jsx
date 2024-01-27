import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import iconCross from '../../assets/icon-cross.svg'
import style from "../../style/newBoard.module.scss"
import boardsSlice from '../../redux/boardsSlice'
import { v4 as uuid } from "uuid";

export const NewBoard = ({setIsBoardModalOpen}) => {

    const dispatch = useDispatch();
    const current = useSelector((state) => state.boards);
    const [boardName, setBoardName] = useState("");
    const [boardColumns, setBoardColumns] = useState([
        { name: "Todo", tasks: [], id: 1},
        { name: "In progress", tasks: [], id: 2},
        { name: "Done", tasks: [], id: 3},
    ]);

    const onChange = (id, newValue) => {
        setBoardColumns((prevState) => {
            const newState = [...prevState];
            const column = newState.find((col) => col.id === id);
            column.name = newValue;
            return newState;
        });
    };

    const addColumn = (e) => {
        e.preventDefault();
        setBoardColumns((state) => [
                            ...state,
                            { name: "", tasks: [], id: uuid() },
                        ]);
    };

    const createNewBoard = (e) => {
            e.preventDefault();
            console.log(boardName);
            dispatch(boardsSlice.actions.addBoard({boardName, boardColumns}))
            console.log(current);
    };

    const removeColumn = (id) => {
        setBoardColumns((prevState) => prevState.filter((el) => el.id !== id));
    };


    return (
        <div className={style["modal-bg"]}
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setIsBoardModalOpen(false);
            }}>
            <div className={style.modal}>
                <form>
                    <h1>Add New Board</h1>
                    <div>
                        <label>Board Name</label>
                        <input type="text" placeholder='e.g. Web Design'
                                onChange= {(e) => setBoardName(e.target.value)}/>
                    </div>
                    <div className={style["columns-wrapper"]}>
                        <label>Board Columns</label>
            
                        {boardColumns.map((column, index) => {
                            return (
                                <div key={index}>
                                    <input
                                        onChange={(e) => {onChange(column.id, e.target.value)}}
                                        type="text"
                                        value={column.name}/>
                                    <button className={style.close}>
                                        <img src={iconCross} alt="delete-column-icon" 
                                             onClick={() => removeColumn(column.id)}/>
                                    </button>
                                </div>
                            );
                        })}
                        <button className={style.add}
                                onClick={(e) => {addColumn(e)}}>
                                + Add New Column
                        </button>
                    </div>
                        <button className={style.create}
                                onClick= {(e) => {createNewBoard(e)}}>
                                Create New Board
                        </button>   
                </form>
            </div>
        </div>
    )
}
