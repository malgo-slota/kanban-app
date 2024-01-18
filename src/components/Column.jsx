import React from 'react'
import style from '../style/boardGrid.module.scss';
import { Task } from './Task'
import { useSelector } from 'react-redux';

export const Column = ( { colIndex } ) => {

const boards = useSelector((state) => state.boards);
const board = boards.find((board) => board.isActive === true);
const column = board.columns.find((col, i) => i === colIndex);

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