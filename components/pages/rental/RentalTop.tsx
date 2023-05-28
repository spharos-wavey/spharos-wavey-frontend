import React from "react";
import style from "./RentalTop.module.css";
import Image from "next/image";
import { RentalDataType } from "@/types/rentalDataType";

export default function RentalTop(props: { data: RentalDataType }) {
  const { frameInfo, charge } = props.data;


  return (
    <div className={style.topWrap}>
      <div className={style.carImage}>
        <Image
          src={frameInfo.image}
          width={345}
          height={200}
          alt={frameInfo.carName}
          priority
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
        />
        <div className={style.charge}>{charge}%</div>
      </div>
    </div>
  );
}
