import React from "react";
import Image from "next/image";
import style from "./RentalMiddle.module.css";
import Separator from "@/components/ui/Separator";
import { CarFrameDataType } from "@/types/carDataType";
import { MyRentalCarType, RentalDataType, RentalFrameInfoType } from "@/types/rentalDataType";

export default function RentalMiddle(props: {
  frameInfo: CarFrameDataType;
  startDate?: Date;
  endDate?: Date;
  rentData?: MyRentalCarType;
  place?: { name: string };
}) {
  const frameInfo = props.frameInfo;
  console.log(frameInfo.distancePrice, "distancePrice");
  // const serviceStartTime = new Date(props.rentData.startDate);
  // const serviceEndTime = new Date(props.rentData.endDate);


  // const timeGap = serviceEndTime.getTime() - serviceStartTime.getTime();

  // const hours = Math.floor(timeGap / (1000 * 60 * 60));
  // const minutes = Math.floor((timeGap % (1000 * 60 * 60)) / (1000 * 60));


  return (
    <div className={style.middleWrap}>
      <div className={style.subWrap}>
        <div className={style.subtitle}>주행요금</div>
        <div className={style.fare}>{frameInfo.distancePrice}원/km</div>
      </div>
      <div className={style.description}>
        *주행요금은 반납 후 실주행거리에 따라 별도로 청구됩니다.
      </div>

      <Separator gutter={1.8} />

      <div className={style.subtitle}>대여시간</div>
      {/* <div className={style.subWrap}>
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
      </div> */}

      <Separator gutter={1.5} />

      <div className={style.subtitle}>주차장소</div>
      <div className={style.subWrap}>
        <div className={style.content}>대여위치</div>
        <div className={style.arrowWrap}>
          {props.place &&
            <div className={style.location}>{props.place.name}</div>
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
          {props.place &&
            <div className={style.location}>{props.place.name}</div>
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
          {frameInfo.defaultPrice.toLocaleString("kr-KO")}원
        </div>
      </div>

      <Separator gutter={1.5} />

      <div className={style.subtitle}>결제수단</div>
      <div className={style.subWrap}>
        <div className={style.kakaopay}>카카오페이</div>
        <div className={style.subtitle}>
          {frameInfo.defaultPrice.toLocaleString("kr-KO")}원
        </div>
      </div>
    </div>
  );
}
