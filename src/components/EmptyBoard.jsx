import React, { useState } from 'react'
import style from '../style/emptyBoard.module.scss'
import { NewBoard } from './modals/NewBoard';
import { useSelector } from 'react-redux';

export const EmptyBoard = ( { boardsExist } ) => {

  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);

  return (
    <div className={style.emptyBoard}>
      <div className={style.content}>  
        <p>This board is empty. Create a new column to get started.</p>
        <button onClick={() => setNewBoardModalOpen(!newBoardModalOpen)}>+ Add New Column</button>
      </div>
       {newBoardModalOpen ? <NewBoard /> : ''}
    </div>
  )
}
