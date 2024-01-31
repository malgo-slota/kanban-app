import { useState, useEffect } from 'react'
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
  const subtasks = task.subtasks; 
  const completedCounter = subtasks.reduce((counter, sub) => sub.isCompleted === true ? counter += 1 : counter, 0);
  
  return ( 
    <div className={style["cell-task"]}>
            {viewTaskOpen ? <ViewTask   key={taskIndex} 
                                        taskIndex={taskIndex}
                                        colIndex={colIndex} 
                                        viewTaskOpen={viewTaskOpen}
                                        setViewTaskOpen={setViewTaskOpen}
                                        completedCounter={completedCounter}
                                        /> 
                                        : ''}
      <div className={style.wrapper} onClick={() => setViewTaskOpen(!viewTaskOpen)}>
          <div className={style["task-name"]}>
            {task.title}
          </div>
          <div className={style.substask}>
              {completedCounter} of {task.subtasks.length} subtasks
          </div>
      </div>                   
    </div>
  )
}
