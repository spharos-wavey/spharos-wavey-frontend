import React from "react";
import style from "./MapFooter.module.css";
import BottomFixedContainer from "../BottomFixedContainer";
export default function MapFooter() {
  return (
    <BottomFixedContainer>
      <div className={style.footer}>
        <input type="text" placeholder="어디에서 출발하세요?" />
        <div className={style.filterItem}>ㅋ</div>
        <div className={style.filterItem}>ㅎ</div>
      </div>
    </BottomFixedContainer>
  );
}
