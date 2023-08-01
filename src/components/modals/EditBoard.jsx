import React from 'react'
import style from './editBoard.module.scss';
import iconCross from '../../assets/icon-cross.svg'

export const EditBoard = () => {

        document.body.style.overflow = "hidden";
        
  return (
    <div className={style["modal-bg"]}>
    <div className={style.modal}>
        <p>Edit Board</p>
        <div className={style["board-columns"]}>
            <label>Board Name</label>
            <input type="text" value='Platform Launch'></input>
        </div>
        <div className={style["board-columns"]}>
            <label>Board Columns</label>
            <div>
                <input type="text" value="Todo"></input>
                <button><img src={iconCross}  alt="delete column"/></button>
            </div>
             <div>
                <input type="text" value="Doing"></input>
                <button><img src={iconCross}  alt="delete column"/></button>
            </div>
             <div>
                <input type="text" value="Done"></input>
                <button><img src={iconCross}  alt="delete column"/></button>
            </div>
            <button className={style["add-new-column-btn"]}>+ Add New Column</button>
        </div>
        <button className={style["save-changes-btn"]}>Save Changes</button>
    </div>
    </div>
  )
}
