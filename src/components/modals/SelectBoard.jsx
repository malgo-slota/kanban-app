import React from 'react';
import boardIcon from '../../assets/icon-board.svg';
import sunIcon from '../../assets/icon-light-theme.svg';
import moonIcon from '../../assets/icon-dark-theme.svg';
import sidebarHide from '../../assets/icon-hide-sidebar.svg';
import style from '../../style/selectBoard.module.scss';
import { NewBoard } from './NewBoard';
import { useModal } from '../../context/ModalContext';
import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import boardsSlice from '../../redux/boardsSlice';

export const SelectBoard = ( { setIsBoardModalOpen, isBoardModalOpen } ) => {

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const { sidebarOpen, setSidebarOpen } = useModal();
  // document.body.style.overflow = "hidden";
  // but apply it only on mobile
  // ISSUE from desktop to moblie withous closing component 
  // and scrolling when sidebar open on desktop

  return (
    <div className={style["modal-bg"]}>
      <div className={style.modal}>
          <div>
            <img src={logoDark} className={style["display-dark-logo"]} alt=""/>
            <img src={logoLight} className={style["display-light-logo"]} alt=""/>
            <p>ALL BOARDS ({boards.length})</p>
            <ul className={style["boards-list"]}>
                {boards.map((board, index) => {
                  return (
                    <li key={index} 
                        onClick={() => {dispatch(boardsSlice.actions.setBoardActive({ index }))}}>
                        <img src={boardIcon} alt=""/>
                        <span>{board.name}</span>
                    </li>
                  );
                })}
                    <li className={style["create-new-board"]}>
                      <img src={boardIcon} alt=""/>
                      <button onClick={() => {setIsBoardModalOpen(!isBoardModalOpen)}}>
                        + Create New Board
                      </button>
                    </li>
            </ul>
          </div>
          
          <div className={style["modal-bottom"]}>
            <div className={style["display-mode"]}>
              <img src={sunIcon} alt="light theme"/>
              <div>
                  <input type="checkbox" />
                  <div className={style.slider}></div>
              </div>
              <img src={moonIcon} id={style.moon} alt="dark theme"/>
            </div>
            <button className={style["hide-sidebar"]}
                    onClick={() => setSidebarOpen(!sidebarOpen)}>
              <img src={sidebarHide} alt="hide sidebar menu"/>
              <span>Hide Sidebar</span>
            </button>
          </div>
          {isBoardModalOpen ? <NewBoard setIsBoardModalOpen={setIsBoardModalOpen}/> : ''}
      </div>
    </div>
  )
}
