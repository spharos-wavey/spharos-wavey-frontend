import React from "react";
import style from "./RentalTop.module.css";
import Image from "next/image";
import { rentalDataType } from "@/types/rentalDataType";

export default function RentalTop(props:{ data: rentalDataType }) {

  const { carModel, maker, imageUrl, charge } = props.data;
  console.log(imageUrl)
  return (
  
    <div className={style.topWrap}>
      <div className={style.carImage}>
        <Image
          src={imageUrl }
          width={200}
          height={200}
          alt={carModel}
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
