import { useEffect, useState, useRef } from "react";
import styles from "../../../style/select.module.scss";
import { useSelector } from "react-redux";
import chevronDown from '../../../assets/icon-chevron-down.svg';

export const Select = ( { taskIndex, 
                          prevColIndex, 
                          status, 
                          setStatus,
                          colIndex, 
                          newColIndex, 
                          setNewColIndex }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const activeBoard = useSelector((state) => state.boards).find(
                    (board) => board.isActive
    );
    const columns = activeBoard.columns;
    // const col = columns.find((col, i) => i === colIndex);
    // const task = col.tasks.find((task, i) => i === taskIndex);
    const statusRef = useRef(columns.name);
    const [newStatus, setNewStatus] = useState(status);
    // lift this state up and update column index

      useEffect(() => {
        statusRef.current = newStatus;
        console.log(newStatus);
        // console.log(statusRef.current);
        setStatus(newStatus);
      }, [newStatus])
      

    return (
      <div className={`${styles.container} ${isOpen ? styles.show : ""}`}
            onClick={e => {
                        e.stopPropagation()
                        setIsOpen(!isOpen)}}>
          <span className={styles.value}>
            {newStatus}
          </span>
          <div><img src={chevronDown} alt="show other statuses"/></div>
       
          <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
              {/* other available statuses to choose from */}
              {activeBoard.columns.map((option, index) => (
                    <li key={option.name}
                        className={styles.option}
                        onClick={e => {
                          e.stopPropagation();
                          setNewStatus(option.name);
                          setIsOpen(false);
                          // setNewColIndex(index);
                        }}
                        >
                          {option.name}
                    </li>
                    )
              )}
          </ul> 
      </div>
  )
}