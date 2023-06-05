import React from "react";
import Image from "next/image";
import style from "./RentalTop.module.css";

export default function RentalTop(props: {
  carImage: string;
  carName: string;
  carBrand: string;
  battery?: number;
}) {
  return (
    <div className={style.topWrap}>
      <div className={style.carImage}>
        <Image
          src={props.carImage}
          width={345}
          height={200}
          alt={props.carName}
          priority
          placeholder="empty"
        />
      </div>
      <div className={style.carName}>
        {props.carBrand} {props.carName}
      </div>
      <div className={style.harrypotterBinding}>
        <Image
          src="/assets/images/icons/harrypotter.svg"
          width="10"
          height="10"
          alt="harryMark"
          placeholder="empty"
        />
        <div className={style.charge}>{props.battery}%</div>
      </div>
    </div>
  );
}
