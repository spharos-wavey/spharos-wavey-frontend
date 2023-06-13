import React, { useEffect, useState } from "react";
import style from "./RentalMiddle.module.css";
import Separator from "@/components/ui/Separator";
import { BillitaZoneType, RentalDetailType } from "@/types/rentalDataType";
import axios from "axios";

export default function RentalMiddle(props: {rentData : RentalDetailType}
) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const frameInfo = props.rentData;
  const [place, setPlace] = useState<BillitaZoneType>({} as BillitaZoneType);

  const [serviceStartTime, setServiceStartTime] = useState<Date>();
  const [serviceEndTime, setServiceEndTime] = useState<Date>();
  const [timeDiff, setTimeDiff] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [sumHours, setSumHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  
  useEffect(()=> {
    if (!typeof window !== undefined) {
      const startTime = new Date(frameInfo.startDate)
      const endTime = new Date(frameInfo.endDate)
      setServiceStartTime(startTime);
      setServiceEndTime(endTime);
      const timeDiff = Math.abs(
        endTime.getTime() - startTime.getTime()
      );
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeDiff(timeDiff);
      setDays(days);
      setSumHours(hours);
      console.log(hours);
      setMinutes(minutes);
    }
  }, []);

  useEffect(() => {
    const getBillitaZoneInfo = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/billitazone/${frameInfo.billitaZoneId}`
        );
        setPlace(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBillitaZoneInfo();
  }, [frameInfo.billitaZoneId, API_URL]);
  

  return (
    <div className={style.middleWrap}>
      <div className={style.subWrap}>
        <div className={style.subtitle}>주행요금</div>
        {/* <div className={style.fare}>{frameInfo.price}원/km</div> */}
      </div>
      <div className={style.description}>
        *주행요금은 반납 후 실주행거리에 따라 별도로 청구됩니다.
      </div>

      <Separator gutter={1.8} />

      <div className={style.subtitle}>대여시간</div>
      <div className={style.subWrap}>
        <div className={style.content}>
          {serviceStartTime && serviceStartTime?.getMonth() + 1}월 {serviceStartTime && serviceStartTime?.getDate()}일{" "}
          {serviceStartTime && serviceStartTime?.getHours()}:
          {String(serviceStartTime && serviceStartTime?.getMinutes()).padStart(2, "0")}{" "}
          <span>- </span>
          {serviceEndTime && serviceEndTime?.getMonth() + 1}월 {serviceEndTime && serviceEndTime?.getDate()}일{" "}
          {serviceEndTime && serviceEndTime?.getHours()}:
          {String(serviceEndTime && serviceEndTime?.getMinutes()).padStart(2, "0")}{" "}
        </div>  
        <div className={style.displayValue}>{`총 ${days}일 ${sumHours}시간 ${minutes}분`}</div>
      </div>

      <Separator gutter={1.5} />

      <div className={style.subtitle}>주차장소</div>
      <div className={style.subWrap}>
        <div className={style.content}>대여위치</div>
          {place &&
            <div className={style.location}>{place.name}</div>
          }
      </div>
      <div className={style.subWrap}>
        <div className={style.content}>반납위치</div>
          { place &&
            <div className={style.location}>{place.name}</div>
          }
      </div>

      <Separator gutter={1.5} />

      <div className={style.subtitle}>결제정보</div>
      <div className={style.subWrap}>
        <div className={style.content}>대여요금</div>
        <div className={style.displayValue}>
          {frameInfo.price.toLocaleString("kr-KO")}원
        </div>
      </div>

      <Separator gutter={1.5} />

      <div className={style.subtitle}>결제수단</div>
      <div className={style.subWrap}>
        <div className={style.kakaopay}>카카오페이</div>
        <div className={style.displayValue}>
          {frameInfo.price.toLocaleString("kr-KO")}원
        </div>
      </div>
    </div>
  );
}
