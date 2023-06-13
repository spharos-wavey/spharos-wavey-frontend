import React from "react";
import Image from "next/image";
import style from "./RentalTop.module.css";
import ProgressBar from "@/components/ui/ProgressBar";

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
        <div className={style.imgBinding}>
          <Image
            src="/assets/images/icons/harrypotter.svg"
            width="40"
            height="40"
            alt="harryMark"
            placeholder="empty"
          />
        </div>
        {props.battery && (
          <ProgressBar value={props.battery} isIcon={false} width={"60px"} />
        )}
        <div className={style.charge}>{props.battery}%</div>
      </div>
    </div>
  );
}
