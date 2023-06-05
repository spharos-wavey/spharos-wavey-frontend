import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./RentalMiddle.module.css";
import Separator from "@/components/ui/Separator";
import { CarFrameDataType } from "@/types/carDataType";
import { BillitaZoneType, RentalDetailType } from "@/types/rentalDataType";
import axios from "axios";

export default function RentalMiddle(props: {rentData : RentalDetailType}
) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const frameInfo = props.rentData;
  const [place, setPlace] = useState<BillitaZoneType>({} as BillitaZoneType);
  
  const serviceStartTime = new Date(props.rentData.startDate);
  const serviceEndTime = new Date(props.rentData.endDate);


  const timeGap = serviceEndTime.getTime() - serviceStartTime.getTime();

  const hours = Math.floor(timeGap / (1000 * 60 * 60));
  const minutes = Math.floor((timeGap % (1000 * 60 * 60)) / (1000 * 60));


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
  }, [frameInfo.billitaZoneId]);
  console.log(place)
  

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
          {serviceStartTime?.getMonth() + 1}월 {serviceStartTime?.getDay()}일{" "}
          {serviceStartTime?.getHours()}:
          {String(serviceStartTime?.getMinutes()).padStart(2, "0")}{" "}
          <span>- </span>
          {serviceEndTime?.getMonth() + 1}월 {serviceEndTime?.getDay()}일{" "}
          {serviceEndTime?.getHours()}:
          {String(serviceEndTime?.getMinutes()).padStart(2, "0")}{" "}
        </div>
        <div className={style.subtitle}>{`총 ${hours}시간 ${minutes}분`}</div>
      </div>

      <Separator gutter={1.5} />

      <div className={style.subtitle}>주차장소</div>
      <div className={style.subWrap}>
        <div className={style.content}>대여위치</div>
        <div className={style.arrowWrap}>
          {place &&
            <div className={style.location}>{place.name}</div>
          }
          <div className={style.arrow}>
            <Image
              src="/assets/images/icons/rightArrowGreyBold.svg"
              width="10"
              height="10"
              alt="arrow"
            />
          </div>
        </div>
      </div>
      <div className={style.subWrap}>
        <div className={style.content}>반납위치</div>
        <div className={style.arrowWrap}>
          { place &&
            <div className={style.location}>{place.name}</div>
          }
          <div className={style.arrow}>
            <Image
              src="/assets/images/icons/rightArrowGreyBold.svg"
              width="10"
              height="10"
              alt="arrow"
            />
          </div>
        </div>
      </div>

      <Separator gutter={1.5} />

      <div className={style.subtitle}>결제정보</div>
      <div className={style.subWrap}>
        <div className={style.content}>대여요금</div>
        <div className={style.subtitle}>
          {frameInfo.price.toLocaleString("kr-KO")}원
        </div>
      </div>

      <Separator gutter={1.5} />

      <div className={style.subtitle}>결제수단</div>
      <div className={style.subWrap}>
        <div className={style.kakaopay}>카카오페이</div>
        <div className={style.subtitle}>
          {frameInfo.price.toLocaleString("kr-KO")}원
        </div>
      </div>
    </div>
  );
}
