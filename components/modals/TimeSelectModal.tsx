import React, { useEffect, useState } from "react";
import BottomFixedContainer from "../layouts/BottomFixedContainer";
import Button from "../ui/Button";
import style from "./TimeSelectModal.module.css";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 12,
  },
});

export default function TimeSelect() {
  const [timeMuiActive, setTimeMuiActive] = useState(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState();
  const [currentTime, setCurrentTime] = useState<string>(
    dayjs().format("YYYY/MM/DD hh:mm")
  );

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
          padding: "20px 30px",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ height: "80%", fontSize: "0.5rem" }}>
          <MobileDateTimePicker
            className="timePicker"
            label={"출발시간"}
            format={"YYYY/MM/DD hh:mm"}
            value={startTime}
            onChange={(value) => value && setStartTime(value)}
            defaultValue={dayjs().format()}
          />
        </div>
        <div>
          <MobileDateTimePicker
            label={"반납시간"}
            format={"YYYY/MM/DD hh:mm"}
            value={startTime}
            onChange={(value) => value && setStartTime(value)}
            defaultValue={dayjs().format()}
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
