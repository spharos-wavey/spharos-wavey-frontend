import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./RentalTop.module.css";
import { BookListDataType, CarFrameDataType } from "@/types/carDataType";

export default function CarBook(props : {data : BookListDataType}) {




  return (
    <>
      {/* <div className={style.topWrap}>
        <div className={style.carImage}>
          <Image
            src={props.data.image}
            width={345}
            height={200}
            alt={props.data.carName}
            priority
          />
        </div>
        <div className={style.carName}>
          {props.data.carBrand.brandName} {props.data.carName}
        </div>
        <div className={style.harrypotterBinding}>
          <Image
            src="/assets/images/icons/harrypotter.svg"
            width="10"
            height="10"
            alt="harryMark"
          />
          <div className={style.charge}>{props.charge}%</div>
        </div>
      </div> */}

      {/* <div className={style.middleWrap}>
        <div className={style.subWrap}>
          <div className={style.subtitle}>주행요금</div>
          <div className={style.fare}>{props.data.distancePrice}원/km</div>
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
            {props.place && (
              <div className={style.location}>{props.place.name}</div>
            )}
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
            {props.place && (
              <div className={style.location}>{props.place.name}</div>
            )}
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
            {data.defaultPrice.toLocaleString("kr-KO")}원
          </div>
        </div>

        <Separator gutter={1.5} />

        <div className={style.subtitle}>결제수단</div>
        <div className={style.subWrap}>
          <div className={style.kakaopay}>카카오페이</div>
          <div className={style.subtitle}>
            {data.defaultPrice.toLocaleString("kr-KO")}원
          </div>
        </div>
      </div> */}
    </>
  );
}
