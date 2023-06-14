import React, { useEffect, useState } from "react";
import TimeSelect from "@/components/modals/TimeSelectModal";

export default function MapFooter() {
  
  const [timeModal, setTimeModal] = useState<boolean>(true);
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
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimeSelect
      setTimeModal={setTimeModal}
      timeModal={timeModal}
    />
  );
}
