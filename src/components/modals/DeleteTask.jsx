import React, { useEffect } from 'react'
import style from '../../style/deleteModal.module.scss'

export const DeleteTask = () => {

  useEffect(() => {
          document.body.style.overflow = 'hidden';
          return () => document.body.style.overflow = 'unset';
  }, []);
      
  return (
    <div className={style["modal-bg"]}>
        <div className={style.modal}>
            <h1>Delete this task?</h1>
            <p>Are you sure you want to delete the <span>‘Build settings UI’</span> task and its subtasks? This action cannot be reversed.</p>
            <div className={style.buttons}>
                 <button className={style["delete-btn"]}>Delete</button>
                <button className={style["cancel-btn"]}>Cancel</button>
            </div>   
        </div>
      
    </div>
  )
}
