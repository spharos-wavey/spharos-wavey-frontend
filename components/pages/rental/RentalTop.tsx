import React from "react";
import style from "./RentalTop.module.css";
import MenuItem from "@/components/layouts/MenuItem";
import { carStatusData } from "@/datas/staticCarData";
import ChargeInfo from "./ChargeInfo";
import Image from "next/image";
import {rentalTopDataType } from "@/types/rentalDataType";


export default function RentalTop({
  rentalId,
  carModel,
  maker,
  imageUrl,
  charge,
}: rentalTopDataType) {
  return (
  
    <div className={style.topWrap}>
      <div className={style.carImage}>
        <Image
          src={imageUrl || ""}
          width={200}
          height={200}
          alt={carModel || "차량이미지"}
          priority
        />
      </div>
      <div className={style.carName}>Tesla{maker} Model 3{carModel}</div>
      <div className={style.harrypotterBinding}>
        <Image src="/assets/images/icons/harrypotter.svg" width="10" height="10" alt="" />
        <div className={style.charge}>75{charge}%</div>
      </div>
    </div>
    
  );
}
