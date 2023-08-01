import React from 'react'
import style from './boardGrid.module.scss';
import { Task } from './Task'
import { useBoards } from '../context/BoardsContext';

export const Column = ( { colIndex } ) => {

    const { activeBoard } = useBoards();


const column = activeBoard.columns.find((col, i) => i === colIndex);

  return (
        <div className={style.column}>
            <div className={style["column-name"]}>
                <span className={style.dot}></span>
                <span>{column.name} ({(column.tasks).length})</span>
            </div>
            {column.tasks.map((task, index) => (
                <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  )
}