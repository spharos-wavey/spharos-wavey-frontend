import React, { useState } from "react";
import BottomFixedContainer from "../layouts/BottomFixedContainer";
import { MobileDateTimePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import { timeType } from "@/types/rentalDataType";
import Button from "../ui/Button";
import style from "./TimeSelectModal.module.css";
import Swal from "sweetalert2";

interface timeModalType {
  setReqTime: React.Dispatch<React.SetStateAction<timeType>>;
  setTimeModal: React.Dispatch<React.SetStateAction<boolean>>;
  timeModal: boolean;
}

export default function TimeSelect({ setReqTime, setTimeModal, timeModal }: timeModalType) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(
    dayjs().add(10, "minute")
  );
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(
    dayjs().add(70, "minute")
  );
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());

  const timeModalHandler = () => {
    if(startTime.isAfter(endTime)) {
      return;
    } else if(startTime.isSame(endTime)) {
      return;
    } else if(startTime.isBefore(currentTime)) {
      return;
    }

    Swal.fire({
      text: "시간 설정이 변경되었습니다.",
      icon: "success",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });

    setReqTime({
      startTime: startTime.format("YYYY-MM-DD HH:mm"),
      endTime: endTime.format("YYYY-MM-DD HH:mm"),
    });
  };

  return (
    <div className={!timeModal? style.open : style.close}>
    <BottomFixedContainer backgroundColor="white" radius={true}>
        <div style={{ padding: "1rem", display: 'flex', justifyContent: 'space-between' , alignItems: 'center'}}>
          <MobileDateTimePicker
            format={"YYYY/MM/DD HH:mm"}
            value={startTime}
            onChange={(value) => value && setStartTime(value)}
            defaultValue={currentTime}
            minDateTime={dayjs().add(10, "minute").startOf("minute")}
          />
          <MobileDateTimePicker
            format={"YYYY/MM/DD HH:mm"}
            value={endTime}
            onChange={(value) => value && setEndTime(value)}
            defaultValue={startTime}
            minDateTime={startTime.add(1, "hour").startOf("minute")}
          />
        </div>
      
        <Button btnType="button" btnEvent={()=>timeModalHandler()}>
          시간 설정
        </Button>
    </BottomFixedContainer>
    </div>
  );
}
