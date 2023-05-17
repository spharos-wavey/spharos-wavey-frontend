import React, { useEffect, useState } from "react";
import BottomFixedContainer from "../layouts/BottomFixedContainer";
import Button from "../ui/Button";
import style from "./TimeSelectModal.module.css";
import { MobileDateTimePicker } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";

interface timeModal {
  setTimeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeSelect({ setTimeModal }: timeModal) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs());
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(startTime);
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());

  const timeModalHandler = () => {
    alert("선택되었습니다 ~!~!~!");
    setTimeModal(false);
  };

  // console.log("현재시간 : ", currentTime);
  console.log("선택된 출발 시간 : ", startTime.format("YYYY/MM/DD HH:mm"));
  console.log("선택된 반납 시간 : ", endTime.format("YYYY/MM/DD HH:mm"));

  return (
    <BottomFixedContainer backgroundColor="white">
      <div style={{ padding: "10px 0px", fontWeight: "bold" }}>
        시간을 선택해 주세요.
      </div>
      <div
        style={{
          display: "flex",
          gap: "15px",
          padding: "5px 20px",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ height: "80%" }}>
          <MobileDateTimePicker
            label={"출발시간"}
            format={"YYYY/MM/DD HH:mm"}
            value={startTime}
            onChange={(value) => value && setStartTime(value)}
            defaultValue={currentTime}
            minDateTime={dayjs().add(10, "minute").startOf("minute")}
          />
        </div>
        <div>
          <MobileDateTimePicker
            label={"반납시간"}
            format={"YYYY/MM/DD HH:mm"}
            value={endTime}
            onChange={(value) => value && setEndTime(value)}
            defaultValue={startTime}
            minDateTime={startTime.add(1, "hour").startOf("minute")}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "15px",
          padding: "0px 30px",
        }}
      >
        <Button btnType="button" btnEvent={timeModalHandler}>
          시간 선택
        </Button>
        <Button
          btnType="button"
          submitType="cancel"
          btnEvent={() => setTimeModal(false)}
        >
          취소
        </Button>
      </div>
    </BottomFixedContainer>
  );
}
