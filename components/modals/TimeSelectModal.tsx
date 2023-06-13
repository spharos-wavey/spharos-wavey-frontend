import React, { useEffect, useState } from "react";
import { MobileDateTimePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import { timeType } from "@/types/rentalDataType";
import Button from "../ui/Button";
import style from "./TimeSelectModal.module.css";
import Swal from "sweetalert2";
import { useRecoilState, useRecoilValue } from "recoil";
import { nowTimeState } from "@/state/nowTime";
import router from "next/router";

interface TimeModalType {
  setTimeModal: React.Dispatch<React.SetStateAction<boolean>>;
  timeModal: boolean;
}

export default function TimeSelect({ setTimeModal, timeModal }: TimeModalType) {
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(
    dayjs().add(10, "minute")
  );
  const [endTime, setEndTime] = useState<dayjs.Dayjs>(
    dayjs().add(70, "minute")
  );
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());
  const [reqTime, setReqTime] = useRecoilState<timeType>(nowTimeState);
  const canCarBeBooked = useRecoilValue<timeType>(nowTimeState);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const START_TIME = canCarBeBooked.startTime;
  const END_TIME = canCarBeBooked.endTime;

  const canItBeBooked = async () => {

    try {
      const res = await fetch(
        `${API_URL}/vehicle/book-check?id=${router.query.cid}&sDate=${START_TIME}&eDate=${END_TIME}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data, "canItBeBooked");
      console.log(START_TIME, END_TIME, "chec");

      Swal.fire({
        text: "시간 설정이 변경되었습니다.",
        icon: "success",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      setTimeModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const timeModalHandler = () => {
    // if (startTime.isAfter(endTime)) {
    //   return;
    // } else if (startTime.isSame(endTime)) {
    //   return;
    // } else if (startTime.isBefore(currentTime)) {
    //   return;
    // }

    setReqTime({
      startTime: startTime.format("YYYY-MM-DD HH:mm"),
      endTime: endTime.format("YYYY-MM-DD HH:mm"),
    });

    canItBeBooked()

    if (typeof window !== undefined) {
      sessionStorage.setItem("startTime", startTime.format("YYYY-MM-DD HH:mm"));
      sessionStorage.setItem("endTime", endTime.format("YYYY-MM-DD HH:mm"));
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const sessionStartTime = sessionStorage.getItem("startTime");
      const sessionEndTime = sessionStorage.getItem("endTime");

      if (sessionStartTime && sessionEndTime) {
        setStartTime(dayjs(sessionStartTime as string));
        setEndTime(dayjs(sessionEndTime as string));
        setReqTime({
          startTime: sessionStartTime,
          endTime: sessionEndTime,
        });
      } else {
        setStartTime(dayjs().add(10, "minute"));
        setEndTime(dayjs().add(70, "minute"));
        setReqTime({
          startTime: dayjs().add(10, "minute").format("YYYY-MM-DD HH:mm"),
          endTime: dayjs().add(70, "minute").format("YYYY-MM-DD HH:mm"),
        });
      }
    }
  }, []);

  return (
    <div
      className={
        !timeModal
          ? `${style.timeModal} ${style.open}`
          : `${style.timeModal} ${style.close}`
      }
    >
      <div className={style.picker}>
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
      <Button btnType="button" btnEvent={() => timeModalHandler()} width="90%">
        시간 설정
      </Button>
    </div>
  );
}
