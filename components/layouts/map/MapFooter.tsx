import React, { useEffect, useState } from "react";
import style from "./MapFooter.module.css";
import BottomFixedContainer from "../BottomFixedContainer";
import TimeSelectModal from "@/components/modals/TimeSelectModal";
import { timeType } from "@/types/rentalDataType";

export default function MapFooter(props: {
  setReqTime: React.Dispatch<React.SetStateAction<timeType>>;
}) {
  const [timeModal, setTimeModal] = useState(false);
  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0].clientY > 100) {
        setTimeModal(true);
      } 
    };
    window.addEventListener("touchmove", handleTouch);
    return () => {
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  // interval 3s for slide down
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeModal(false);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BottomFixedContainer backgroundColor="transparent">
      <div className={style.footer}>
        {/* <input type="text" placeholder="어디에서 출발하세요?" />
        <div className={style.filterItem} onClick={() => setTimeModal(true)}>
          시간
        </div> */}
        {/* {timeModal && ( */}
          <TimeSelectModal
            setReqTime={props.setReqTime}
            setTimeModal={setTimeModal}
            timeModal={timeModal}
          />
        {/* )}
        <div className={style.filterItem}>차종</div> */}
      </div>
    </BottomFixedContainer>
  );
}
