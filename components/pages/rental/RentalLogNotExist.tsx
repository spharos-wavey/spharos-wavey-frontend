import React from 'react'
import style from "./RentalLogWrapper.module.css";

export default function RentalLogNotExist() {
  return (
    <div className={style.noLog}>
      이용 내역이 없습니다.
    </div>
  )
}
