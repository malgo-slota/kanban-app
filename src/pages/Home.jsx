import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { BoardGrid } from '../components/BoardGrid'
import { SelectBoard } from '../components/modals/SelectBoard'
import { EmptyBoard } from '../components/EmptyBoard'
import { useBoards } from '../context/BoardsContext'  
// import boardsSlice from "../redux/boardsSlice";
// import { useDispatch, useSelector } from "react-redux";

export const Home = () => {

    // const [sidebarOpen, setSidebarOpen] = useState(false);
    const [boardsExist, setBoardsExist] = useState(true);
    const [selectedBoard, setSelectedBoard] = useState("Platform Launch");

     const { boards, sidebarOpen } = useBoards();
    
  // const dispatch = useDispatch();
  //   const boards = useSelector((state) => state.boards);
  // const board = boards.find((board) => board.isActive === true);

  return (
    <div>
        <Navbar 
                // sidebarOpen={sidebarOpen} 
                // setSidebarOpen={setSidebarOpen} 
                boardsExist={boardsExist} 
                selectedBoard={selectedBoard}
                />
        {boardsExist ?  <BoardGrid boards={boards} 
                                    // sidebarOpen={sidebarOpen} 
                                    // setSidebarOpen={setSidebarOpen}
                                    /> : <EmptyBoard />}
       
        {sidebarOpen ? <SelectBoard 
                                    // sidebarOpen={sidebarOpen} 
                                    // setSidebarOpen={setSidebarOpen} 
                                    selectedBoard={selectedBoard}
                                    setSelectedBoard={setSelectedBoard} 
                                    /> : ''}
    </div>
  )
}
