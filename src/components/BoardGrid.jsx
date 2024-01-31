import { useState } from 'react'
import style from '../style/boardGrid.module.scss';
import { EditBoard } from './modals/EditBoard';
import { Column } from './Column';
import { useSelector } from 'react-redux';
import { useModal } from '../context/ModalContext';

export const BoardGrid = () => {


    const { sidebarOpen } = useModal();

    const [editBoardOpen, setEditBoardOpen] = useState(false);
    const activeBoard = useSelector((state) => state.boards).find((board) => board.isActive);
    const columns = activeBoard.columns;

    return (
        <div className={sidebarOpen ? `${style.grid} ${style["sidebar-open"]}` : `${style.grid}`}>
        {/* // className={style.grid}> */}
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