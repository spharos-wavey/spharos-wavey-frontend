import React from "react";
import style from "./DetailInfoTop.module.css";
import Image from "next/image";
import { carDetailData } from "@/datas/staticMenuDatas";

export default function DetailInfoTop() {
  return (
    <>
      <div className={style.topContainer}>
        <div className={style.carName}>{carDetailData.name}</div>
        <div className={style.review}> 150 reviews </div>
        <div className={style.carImage}>
          <Image
            src={carDetailData.src}
            width={200}
            height={200}
            alt={carDetailData.name}
            priority
          />
        </div>
      </div>
    </>
  );
}
