import React from 'react'
import style from './dropDopwn.module.scss';

export const DropDown = () => {

      document.body.style.overflow = "hidden";

  return (
    <div className={style.modal}>
        <button>Edit Board</button>
        <button className={style["delete-btn"]}>Delete Board</button>
    </div>
  )
}
