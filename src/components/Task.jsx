import { useState } from 'react'
import style from '../style/boardGrid.module.scss';
import { ViewTask } from './modals/ViewTask';
import { useSelector } from 'react-redux';

export const Task = ( { colIndex, taskIndex } ) => {

    const [viewTaskOpen, setViewTaskOpen] = useState(false);
    const activeBoard = useSelector((state) => state.boards).find(
                    (board) => board.isActive
    );
    const columns = activeBoard.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);

  return ( 
    <div className={style["cell-task"]}
        onClick={()=>setViewTaskOpen(true)}>
            {viewTaskOpen ? <ViewTask   key={taskIndex} 
                                        taskIndex={taskIndex}
                                        colIndex={colIndex} 
                                        /> 
                                        : ''}
        <div className={style["task-name"]}>
            {task.title}
        </div>
        <div className={style.substask}>
            0 of {task.subtasks.length} subtasks
        </div>
    </div>
  )
}
