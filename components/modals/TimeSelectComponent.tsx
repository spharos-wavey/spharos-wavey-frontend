import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { timeType } from "@/types/rentalDataType";
import { nowTimeState } from "@/state/nowTime";
import { MobileDateTimePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import Button from "../ui/Button";
import Swal from "sweetalert2";
import style from "./TimeSelectComponent.module.css";

interface TimeModalType {
  setTimeModal?: React.Dispatch<React.SetStateAction<boolean>>;
  timeModal?: boolean;
}

export default function TimeSelectComponent({
  setTimeModal,
  timeModal,
}: TimeModalType) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(
    dayjs().add(10, "minute")
  );
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(
    dayjs().add(70, "minute")
  );
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());
  const setReqTime = useSetRecoilState<timeType>(nowTimeState);

  const timeModalHandler = () => {
    if (startTime.isAfter(endTime)) {
      return;
    } else if (startTime.isSame(endTime)) {
      return;
    } else if (startTime.isBefore(currentTime)) {
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
    <div className={!timeModal ? style.open : style.close}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
        }}
      >
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
        <Button
          btnType="button"
          btnEvent={() => timeModalHandler()}
          shadow={true}
          width={"100%"}
        >
          시간 설정
        </Button>
      </div>
    </div>
  );
}
