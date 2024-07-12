import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { BoardGrid } from '../components/BoardGrid'
import { SelectBoard } from '../components/modals/SelectBoard'
import { EmptyBoard } from '../components/EmptyBoard'
import { useModal } from '../context/ModalContext'  
import boardsSlice from '../redux/boardsSlice'
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {

    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const theme = useSelector((state) => state.theme);
   
  
    const activeBoard = boards.find((board) => board.isActive);
    if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    const [boardsExist, setBoardsExist] = useState(true);
    const [selectedBoard, setSelectedBoard] = useState("Platform Launch");

    const { sidebarOpen } = useModal();
    
  // const dispatch = useDispatch();
  //   const boards = useSelector((state) => state.boards);
  // const board = boards.find((board) => board.isActive === true);

  return (
    <div className={theme}>
        <Navbar boardsExist={boardsExist} 
                selectedBoard={selectedBoard}
                />
        {/* {boardsExist ?  <BoardGrid boards={boards} /> : <EmptyBoard />} */}
        {boardsExist ?  <EmptyBoard />  : <BoardGrid boards={boards}/>}
        {/* {sidebarOpen ? <SelectBoard selectedBoard={selectedBoard}
                                    setSelectedBoard={setSelectedBoard} 
                                    /> : ''} */}
    </div>
  )
}
