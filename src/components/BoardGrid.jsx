import { useState } from 'react'
import style from './boardGrid.module.scss'
import eyeIcon from '../assets/icon-show-sidebar.svg';
import { useBoards } from '../context/BoardsContext';
import { EditBoard } from './modals/EditBoard';
import { Column } from './Column';



export const BoardGrid = () => {

    

    const [editBoardOpen, setEditBoardOpen] = useState(false);

    const { activeBoard, sidebarOpen, setSidebarOpen } = useBoards();

    const columns = activeBoard.columns;

    return (
    <div className={style.grid}>

        {columns.length > 0 ? (
            columns.map((column, index) => (
                <Column key={index} colIndex={index} />
          )) 
        ) : '' }    
        <div className={`${style.column} ${style["add-column"]}`}
                onClick={() => setEditBoardOpen(!editBoardOpen)}
                >
            + New Column
        </div>
        {editBoardOpen ? <EditBoard /> : ''}

        <button className={style["show-sidebar"]}
                onClick={() => setSidebarOpen(!sidebarOpen)}>
            <img src={eyeIcon}  alt="open sidebar menu"/>
        </button>
    </div>
  )
}