import React, { useState } from "react";
import style from "./MapFooter.module.css";
import BottomFixedContainer from "../BottomFixedContainer";
import TimeSelectModal from "@/components/modals/TimeSelectModal";
export default function MapFooter() {
  const [timeSelect, setTimeSelect] = useState(false);

  return (
    <BottomFixedContainer backgroundColor="transparent">
      <div className={style.footer}>
        <input type="text" placeholder="어디에서 출발하세요?" />
        <div className={style.filterItem} onClick={() => setTimeSelect(true)}>
          시간
        </div>
        {timeSelect && <TimeSelectModal setTimeModal={setTimeSelect} />}
        <div className={style.filterItem}>차종</div>
      </div>
    </BottomFixedContainer>
  );
}
