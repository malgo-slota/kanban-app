import { useState } from 'react'
import style from '../style/boardGrid.module.scss';
import { EditBoard } from './modals/EditBoard';
import { Column } from './Column';
import { useSelector } from 'react-redux';

export const BoardGrid = () => {

    const [editBoardOpen, setEditBoardOpen] = useState(false);
    const activeBoard = useSelector((state) => state.boards).find((board) => board.isActive);
    const columns = activeBoard.columns;

    return (
        <div className={style.grid}>
            {columns.length > 0 ? (
                columns.map((column, index) => (
                    <Column key={index} colIndex={index} />
                ))) 
            : '' }    
            <div className={`${style.column} ${style["add-column"]}`}
                    onClick={() => setEditBoardOpen(!editBoardOpen)}>
                    + New Column
            </div>
            {editBoardOpen ? <EditBoard /> : ''}
        </div>
    )
}