import React from "react";
import Image from "next/image";
import style from "./RentalTop.module.css";
import { RentalFrameInfoType } from "@/types/rentalDataType";

export default function RentalTop(props: { data: RentalFrameInfoType, charge?: number }) {
  console.log(`rentalTop data : `, props.data, props.charge);
  // const { carBrand, carName } = props.data;


  return (
    <div className={style.topWrap}>
      <div className={style.carImage}>
        
        <Image
          src={props.data.image}
          width={345}
          height={200}
          alt={props.data.carName}
          priority
          placeholder="empty"
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
          placeholder="empty"
        />
        <div className={style.charge}>{props.charge}%</div>
      </div>
    </div>
  );
}
