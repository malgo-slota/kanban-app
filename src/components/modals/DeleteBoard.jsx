import React from 'react'
import style from './deleteModal.module.scss'

export const DeleteBoard = () => {

      document.body.style.overflow = "hidden";
      
  return (
    <div className={style["modal-bg"]}>
        <div className={style.modal}>
            <h1>Delete this board?</h1>
            <p>Are you sure you want to delete the <span>‘Platform Launch’</span> board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className={style.buttons}>
                 <button className={style["delete-btn"]}>Delete</button>
                <button className={style["cancel-btn"]}>Cancel</button>
            </div>   
        </div>
      
    </div>
  )
}
