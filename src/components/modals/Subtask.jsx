import style from '../../style/viewTask.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';

export const Subtask = ( { subtaskIndex, colIndex, taskIndex }) => {

    const activeBoard = useSelector((state) => state.boards).find((board) => board.isActive);
    const columns = activeBoard.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const subtasks = task.subtasks;
    const subtask = subtasks[subtaskIndex];
    const dispatch = useDispatch();

    const changeSubtaskCompeleted = () => {   
        dispatch(boardsSlice.actions.setSubtaskIsCompleted({
                                                colIndex,
                                                taskIndex,
                                                subtaskIndex,
                                    }))
    };

  return (
        <div className={style.subtask}>
            <input  type="checkbox" 
                    id="one" 
                    defaultChecked={subtask.isCompleted}
                    onChange={() => changeSubtaskCompeleted()} />
            <label htmlFor='one'>
                {subtask.title} 
            </label>
        </div>
  )
}
