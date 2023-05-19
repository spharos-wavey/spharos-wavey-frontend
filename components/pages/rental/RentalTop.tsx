import React from "react";
import style from "./RentalTop.module.css";
import Image from "next/image";
import { rentalDataType } from "@/types/rentalDataType";

export default function RentalTop(props: { data: rentalDataType }) {
  const { carModel, maker, imageUrl, charge } = props.data;

  return (
    <div className={style.topWrap}>
      <div className={style.carImage}>
        <Image
          src={imageUrl}
          width={345}
          height={200}
          alt={carModel}
          priority
        />
      </div>
      <div className={style.carName}>
        {maker} {carModel}
      </div>
      <div className={style.harrypotterBinding}>
        <Image
          src="/assets/images/icons/harrypotter.svg"
          width="10"
          height="10"
          alt=""
        />
        <div className={style.charge}>{charge}%</div>
      </div>
    </div>
  );
}
