import { useState } from 'react'
import logoMobile from '../assets/logo-mobile.svg'
import iconAddTaskMobile from '../assets/icon-add-task-mobile.svg'
import verticalEllipsis from '../assets/icon-vertical-ellipsis.svg'
import chevronDown from '../assets/icon-chevron-down.svg'
import chevronUp from '../assets/icon-chevron-up.svg';
import logoLight from '../assets/logo-light.svg';
import logoDark from '../assets/logo-dark.svg';
import style from '../style/navbar.module.scss';
import { NewTask } from './modals/NewTask'
import { SelectBoard } from './modals/SelectBoard'
import { DropDown } from './modals/DropDown'
import { useModal } from '../context/ModalContext'
import { useSelector } from 'react-redux';
import eyeIcon from '../assets/icon-show-sidebar.svg';



export const Navbar = ( {boardsExist} ) => {

  const activeBoard = useSelector((state) => state.boards).find(
                    (board) => board.isActive
  );
  const theme = useSelector((state) => state.theme);
  
  // const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [editBoardModalOpen, setEditBoardModalOpen] = useState(false);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const { sidebarOpen, setSidebarOpen, setAddTaskModalOpen, addTaskModalOpen } = useModal();
  return (
    <div className={theme === 'dark' ? `${style.navbar} ${style["navbar-dark"]}` : style.navbar}>
        <div className={`${style["navbar-left"]}`}>
            {sidebarOpen ? <SelectBoard setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen}/> : ''}
            <img src={logoMobile} className={style["display-mobile-logo"]} alt=""/>
            <img  src={theme === 'dark' ? logoLight : logoDark} 
                  className={style["display-dark-logo"]} 
                  alt=""/>
            <img src={logoLight} 
                  className={style["display-light-logo"]} 
                  alt=""/>
            <span className={style["vertical-line"]}></span>
            <div className={style["board-name"]}>
              <span className={sidebarOpen ? style.isOpen : ''}>{activeBoard.name}</span>
              {/* opens mobile menu */}
              <button   className={style.chevron}
                        onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <img  src={sidebarOpen ? chevronUp : chevronDown} 
                        alt="select board"/>
              </button> 
              {/* opens bigger screen menu, breakpoint at 768px */}
              {!sidebarOpen &&  
                <button className={style["show-sidebar"]}
                      onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <img  src={eyeIcon}  
                        alt="open sidebar menu"/>
                </button> }
            </div> 
        </div>
        <div className={style["navbar-right"]}>
            <button className={`${style.addTaskButton} ${boardsExist ? '' : `${style["addTaskButton-disabled"]}`}`}
                    onClick={() => boardsExist ? setAddTaskModalOpen(!addTaskModalOpen) : ''}>
                      <img src={iconAddTaskMobile} alt=""/>
                      <span className={style["add-task-txt"]}>Add New Task</span>
            </button>
              
            <button onClick={() => setDropDownOpen(!dropDownOpen)}><img src={verticalEllipsis} className={style.verticalElipses} alt="open dropdown menu"/></button>
        </div>
       {addTaskModalOpen ? <NewTask /> : ''}
       {dropDownOpen ? <DropDown  
                                  setEditBoardModalOpen={setEditBoardModalOpen} 
                                  editBoardModalOpen={editBoardModalOpen} 
                                  type={"Board"} 
                                  setDropDownOpen={setDropDownOpen}/> : ''}
    </div>
  )
}
