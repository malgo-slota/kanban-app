import { useEffect, useState, useRef } from "react";
import styles from "../../../style/select.module.scss";
import { useSelector } from "react-redux";
import chevronDown from '../../../assets/icon-chevron-down.svg';
import chevronUp from '../../../assets/icon-chevron-up.svg';

// type SelectProps = {
//     colIndex: number,
//     taskIndex: number,
// }

export const Select = ( { taskIndex, colIndex }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const activeBoard = useSelector((state) => state.boards).find(
                    (board) => board.isActive
    );
    let currentStatus = activeBoard.columns[colIndex].tasks[taskIndex].status;

    const statusRef = useRef(currentStatus);
    const [newStatus, setNewStatus] = useState(statusRef.current);
    // lift this state up and update column index

    // const columns = activeBoard.columns;
    // const col = columns.find((col, i) => i === colIndex);
    // const task = col.tasks.find((task, i) => i === taskIndex);

    // const options = [];

    // activeBoard.columns.map((item) => options.push(item.name));
    // console.log(options);

    // const [newStatus, setNewStatus] = useState();
    // const [newColIndex, setNewColIndex] = useState(columns.indexOf(col))

      const changeStatus = (option) => {
         setNewStatus(option.name);
         
        // setNewStatus(e.target.value);
        // setNewColIndex(e.target.selectedIndex);
      };

      useEffect(() => {
        statusRef.current = newStatus;
        console.log(newStatus);
        console.log(statusRef);
      }, [newStatus])
      

    return (
      <div className={`${styles.container} ${isOpen ? styles.show : ""}`}
            onClick={e => {
                        e.stopPropagation()
                        setIsOpen(!isOpen)}}>
        {/* clcking on value closes modal ! why */}
          <span className={styles.value}>{newStatus}</span>
          <div><img src={chevronDown} alt="show other statuses"/></div>
       
          <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
              {/* other available statuses to choose from */}
              {activeBoard.columns.map(option => (
                    <li key={option.name}
                        className={styles.option}
                        onClick={e => {
                          e.stopPropagation()
                          changeStatus(option)
                          setIsOpen(false)
                        }}
                        >
                          {option.name}
                    </li>
                    )
              )}
          </ul>




        {/* current task status */}
        {/* <span>{activeBoard.columns[colIndex].tasks[taskIndex].status}</span> */}
        {/* {console.log(activeBoard.columns)} */}
        
      </div>
  )
}

          // <select
          //     className={styles.container}>
          //     {/* // value={status} */}
             
          //     {columns.map((col, index) => (
          //       <option className="status-options" key={index}  onChange={onChange}>
          //         {col.name}
          //       </option>
          //     ))}
          // </select> 