import React, { useEffect, useState } from "react";
import BottomFixedContainer from "../layouts/BottomFixedContainer";
import Button from "../ui/Button";
import { MobileDateTimePicker } from "@mui/x-date-pickers-pro";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import { timeType } from "@/types/rentalDataType";

interface timeModal {
  setReqTime: React.Dispatch<React.SetStateAction<timeType>>;
  setTimeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeSelect({ setReqTime, setTimeModal }: timeModal) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(
    dayjs().add(10, "minute")
  );
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(
    dayjs().add(70, "minute")
  );
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());

  const timeModalHandler = () => {
    alert("시간이 설정되었습니다!");
    setReqTime({
      startTime: startTime.format("YYYY-MM-DD HH:mm"),
      endTime: endTime.format("YYYY-MM-DD HH:mm"),
    });
    setTimeModal(false);
  };

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
        <Button
          btnType="button"
          submitType="cancel"
          btnEvent={() => setTimeModal(false)}
        >
          취소
        </Button>
        <Button btnType="button" btnEvent={timeModalHandler}>
          시간 선택
        </Button>
      </div>
    </BottomFixedContainer>
  );
}
