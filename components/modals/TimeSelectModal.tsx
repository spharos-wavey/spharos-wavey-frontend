import React, { useEffect, useState } from "react";
import BottomFixedContainer from "../layouts/BottomFixedContainer";
import Button from "../ui/Button";
import { MobileDateTimePicker } from "@mui/x-date-pickers-pro";
import { useRecoilState } from "recoil";
import { timeState } from "@/state/rentalTime";
import dayjs from "dayjs";
import { timeType } from "@/types/rentalDataType";

interface timeModal {
  setTimeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeSelect({ setTimeModal }: timeModal) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs());
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(dayjs());
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());

  // Dayjs 타입이 Recoil-persist에 적용되지 않는 이슈 때문에, 변수 따로 관리
  const [recoilTime, setRecoilTime] = useRecoilState<timeType>(timeState);

  const timeModalHandler = () => {
    alert("시간이 설정되었습니다!");
    setTimeModal(false);
    setRecoilTime({
      startTime: startTime.format("YYYY-MM-DD HH:mm"),
      endTime: endTime.format("YYYY-MM-DD HH:mm"),
    });
  };

  // console.log("선택된 출발 시간 : ", startTime.format("YYYY/MM/DD HH:mm"));
  // console.log("선택된 반납 시간 : ", endTime.format("YYYY/MM/DD HH:mm"));

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
