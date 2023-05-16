import React, { useState } from "react";
import style from "./MapFooter.module.css";
import BottomFixedContainer from "../BottomFixedContainer";
import TimeSelectModal from "@/components/modals/TimeSelectModal";
export default function MapFooter() {
  const [timeSelect, setTimeSelect] = useState(false);

  const timeModalHandler = () => {
    setTimeSelect(true);
  };

  return (
    <BottomFixedContainer backgroundColor="transparent">
      <div className={style.footer}>
        <input type="text" placeholder="어디에서 출발하세요?" />
        <div className={style.filterItem} onClick={timeModalHandler}>
          시간
        </div>
        {timeSelect && <TimeSelectModal />}
        <div className={style.filterItem}>차종</div>
      </div>
    </BottomFixedContainer>
  );
}
