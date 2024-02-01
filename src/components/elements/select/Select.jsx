import { useState } from "react";
import styles from "../../../style/select.module.scss";
import { useSelector } from "react-redux";
import chevronDown from '../../../assets/icon-chevron-down.svg';

export const Select = ({ 
                          status,
                          setStatus,
                          setNewColIndex,
                        }) => {
    
  const [isOpen, setIsOpen] = useState(false);
  const activeBoard = useSelector((state) => state.boards).find((board) => board.isActive);

  const changeStatus = (index, option) => {
    setNewColIndex(index)
    setStatus(option.name)
  }
      
  return (
    <div className={`${styles.container} ${isOpen ? styles.show : ""}`}
          onClick={e => {
                          e.stopPropagation()
                          setIsOpen(!isOpen)
                        }}>
        <span className={styles.value}>
          {status}
        </span>
        <div><img src={chevronDown} alt="show other statuses"/></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
            {/* other available statuses to choose from */}
            {activeBoard.columns.map((option, index) => (
                <li key={index}
                    className={styles.option}
                    onClick={() => changeStatus(index, option)}>
                    {option.name}
                </li>
                )
            )}
        </ul> 
    </div>
  )
}