import React from 'react'
import iconCross from '../../assets/icon-cross.svg'
import style from "./newBoard.module.scss"


export const NewBoard = () => {

// const ref = useRef();
//   useEffect(() => {
//     const checkIfClickedOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) {
//         onClose();
//       }
//     };
//     document.addEventListener("click", checkIfClickedOutside);
//     return () => {
//       document.removeEventListener("click", checkIfClickedOutside);
//     };
//   }, [onClose]);

    document.body.style.overflow = "hidden";
   

  return (
      <div className={style["modal-bg"]}>
    <div className={style.modal}>
        <form>
            <h1>Add New Board</h1>
            <div>
                <label>Board Name</label>
                <input type="text" placeholder='e.g. Web Design'></input>
            </div>
            <div className={style["columns-wrapper"]}>
                <label>Board Columns</label>
                <div>
                    <input type="text" value='Todo'></input>
                    <button className={style.close}><img src={iconCross} alt="delete column"/></button>
                </div>
                <div>
                    <input type="text" value='Doing'></input>
                    <button className={style.close}><img src={iconCross}  alt="delete column"/></button>
                </div>
                <button className={style.add}>+ Add New Column</button>
            </div>
            <button className={style.create}>Create New Board</button>
        </form>
    </div>
    </div>
  )
}
