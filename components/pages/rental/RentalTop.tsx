import React from "react";
import Image from "next/image";
import style from "./RentalTop.module.css";
import { CarFrameDataType } from "@/types/carDataType";

export default function RentalTop(props: { frameInfo: CarFrameDataType, charge?: number }) {

  const frameInfo = props.frameInfo;
  console.log(props.charge);
  return (
    <div className={style.topWrap}>
      <div className={style.carImage}>
        
        <Image
          src={frameInfo.image}
          width={345}
          height={200}
          alt={frameInfo.carName}
          priority
          placeholder="empty"
        />
      </div>
      <div className={style.carName}>
        {frameInfo.carBrand.brandName} {frameInfo.carName}
      </div>
      <div className={style.harrypotterBinding}>
        <Image
          src="/assets/images/icons/harrypotter.svg"
          width="10"
          height="10"
          alt="harryMark"
          placeholder="empty"
        />
        <div className={style.charge}>{props.charge}%</div>
      </div>
    </div>
  );
}
