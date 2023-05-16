import React from "react";
import Image from "next/image";
import style from "./RentalMiddle.module.css";
import Separator from "@/components/ui/Separator";
import { rentalMiddleDataType } from "@/types/rentalDataType";

export default function RentalMiddle({
  fare,
  startTime,
  endTime,
  totalRentTime,
  billitazone,
  rentalfee,
  insurancefee,
}: rentalMiddleDataType) {
  return (
    <div className={style.middleWrap}>
      <div className={style.subWrap}>
        <div className={style.subtitle}>주행요금</div>
        <div className={style.fare}>160원/km</div>
      </div>
      <div className={style.description}>
        *주행요금은 반납 후 실주행거리에 따라 별도로 청구됩니다.
      </div>

      <Separator gutter={2}/>

      <div className={style.subtitle}>대여시간</div>
      <div className={style.subWrap}>
        <div className={style.content}>04월 19일 21:00 - 04월 20일 15:00</div>
        <div className={style.subtitle}>총 1일 00시간</div>
      </div>

      <Separator gutter={2}/>

      <div className={style.subtitle}>주차장소</div>
      <div className={style.subWrap}>
        <div className={style.content}>대여위치</div>
        <div className={style.arrowWrap}>
          <div className={style.location}>센텀프리미어 호텔</div>
          <div className={style.arrow}>
            <Image src="/assets/images/icons/rightArrowGreyBold.svg" width="10" height="10" alt="arrow"/>
          </div>
        </div>
      </div>
      <div className={style.subWrap}>
        <div className={style.content}>반납위치</div>
        <div className={style.arrowWrap}>
          <div className={style.location}>센텀프리미어 호텔</div>
          <div className={style.arrow}>
            <Image src="/assets/images/icons/rightArrowGreyBold.svg" width="10" height="10" alt="arrow"/>
          </div>
        </div>
      </div>

      <Separator gutter={2}/>

      <div className={style.subtitle}>결제정보</div>
      <div className={style.subWrap}>
        <div className={style.content}>대여요금</div>
        <div className={style.subtitle}>5030원</div>
      </div>

      <Separator gutter={2}/>

      <div className={style.subtitle}>결제수단</div>
      <div className={style.subWrap}>
        <div className={style.kakaopay}>카카오페이</div>
        <div className={style.subtitle}>5030원</div>
      </div>
    </div>
  );
}
