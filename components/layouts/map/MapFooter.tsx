import React, { useEffect, useState } from "react";
import style from "./MapFooter.module.css";
import BottomFixedContainer from "../BottomFixedContainer";
import TimeSelectModal from "@/components/modals/TimeSelectModal";

export default function MapFooter() {
  
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
          <TimeSelectModal
            setTimeModal={setTimeModal}
            timeModal={timeModal}
          />
      </div>
    </BottomFixedContainer>
  );
}
