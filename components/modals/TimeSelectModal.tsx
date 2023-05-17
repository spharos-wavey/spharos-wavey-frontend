import React, { useEffect, useState } from "react";
import BottomFixedContainer from "../layouts/BottomFixedContainer";
import Button from "../ui/Button";
import style from "./TimeSelectModal.module.css";
import { MobileDateTimePicker } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import { createTheme } from "@mui/material";

export default function TimeSelect() {
  const [timeMuiActive, setTimeMuiActive] = useState(false);
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs());
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(startTime);
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());

  const timeMuiHandler = () => {
    setTimeMuiActive(true);
  };

  console.log("현재시간 : ", currentTime);
  console.log("선택된 출발 시간 : ", startTime);

  return timeMuiActive === true ? (
    <BottomFixedContainer backgroundColor="white">
      <div
        style={{
          display: "flex",
          gap: "15px",
          padding: "20px",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ height: "80%" }}>
          <MobileDateTimePicker
            label={"출발시간"}
            format={"YYYY/MM/DD hh:mm"}
            value={startTime}
            onChange={(value) => value && setStartTime(value)}
            defaultValue={currentTime}
            minDate={dayjs().startOf("hour")}
          />
        </div>
        <div>
          <MobileDateTimePicker
            label={"반납시간"}
            format={"YYYY/MM/DD hh:mm"}
            value={endTime}
            onChange={(value) => value && setEndTime(value)}
            defaultValue={startTime}
            minDate={startTime.startOf("minute")}
          />
        </div>
      </div>
    </BottomFixedContainer>
  ) : (
    <>
      <BottomFixedContainer backgroundColor="white">
        <div>시간을 선택해 주세요.</div>
        <div style={{ display: "flex", gap: "15px", padding: "0px 30px" }}>
          <Button btnType="button" btnEvent={timeMuiHandler}>
            시간 선택
          </Button>
          <Button
            btnType="button"
            submitType="cancel"
            btnEvent={() => alert("시간 선택")}
          >
            취소
          </Button>
        </div>
      </BottomFixedContainer>
    </>
  );
}