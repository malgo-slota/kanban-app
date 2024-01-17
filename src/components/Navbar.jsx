import { useState } from 'react'
import logoMobile from '../assets/logo-mobile.svg'
import iconAddTaskMobile from '../assets/icon-add-task-mobile.svg'
import verticalElipses from '../assets/icon-vertical-ellipsis.svg'
import chevronDown from '../assets/icon-chevron-down.svg'
import logoLight from '../assets/logo-light.svg';
import logoDark from '../assets/logo-dark.svg';
import style from './/navbar.module.scss';
import { NewTask } from './modals/NewTask'
import { SelectBoard } from './modals/SelectBoard'
import { DropDown } from './modals/DropDown'
import { useBoards } from '../context/BoardsContext'

export const Navbar = ( {boardsExist} ) => {

  // const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [selectBoardModalOpen, setSelectBoardModalOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const { activeBoard, sidebarOpen, setAddTaskModalOpen, addTaskModalOpen } = useBoards();

  return (
    <div className={style.navbar}>
        <div className={`${style["navbar-left"]}`}>
            <img src={logoMobile} className={style["display-mobile-logo"]} alt=""/>
            <img src={logoDark} className={style["display-dark-logo"]} alt=""/>
            <img src={logoLight} className={style["display-light-logo"]} alt=""/>
            <span className={style["vertical-line"]}></span>
            <div className={style["board-name"]}>
              <span className={sidebarOpen ? style.isOpen : ''}>{activeBoard.name}</span>
              <button onClick={() => setSelectBoardModalOpen(!selectBoardModalOpen)}><img src={chevronDown} alt="select board"/></button>
            </div> 
        </div>
        <div className={style["navbar-right"]}>
            <button className={`${style.addTaskButton} ${boardsExist ? '' : `${style["addTaskButton-disabled"]}`}`}
                    onClick={() => boardsExist ? setAddTaskModalOpen(!addTaskModalOpen) : ''}>
                      <img src={iconAddTaskMobile} alt=""/>
                      <span className={style["add-task-txt"]}>Add New Task</span>
            </button>
            <button onClick={() => setDropDownOpen(!dropDownOpen)}><img src={verticalElipses} class={style.verticalElipses} alt="open dropdown menu"/></button>
        </div>
       
       {addTaskModalOpen ? <NewTask /> : ''}
       {selectBoardModalOpen ? <SelectBoard /> : ''}
       {dropDownOpen ? <DropDown /> : ''}
    </div>
  )
}
