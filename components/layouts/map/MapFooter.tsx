import React, { useState } from "react";
import style from "./MapFooter.module.css";
import BottomFixedContainer from "../BottomFixedContainer";
import TimeSelectModal from "@/components/modals/TimeSelectModal";
import { timeType } from "@/types/rentalDataType";

export default function MapFooter(props: {
  setReqTime: React.Dispatch<React.SetStateAction<timeType>>;
}) {
  const [timeModal, setTimeModal] = useState(false);

  return (
    <BottomFixedContainer backgroundColor="transparent">
      <div className={style.footer}>
        <input type="text" placeholder="어디에서 출발하세요?" />
        <div className={style.filterItem} onClick={() => setTimeModal(true)}>
          시간
        </div>
        {timeModal && (
          <TimeSelectModal
            setReqTime={props.setReqTime}
            setTimeModal={setTimeModal}
          />
        )}
        <div className={style.filterItem}>차종</div>
      </div>
    </BottomFixedContainer>
  );
}
