import React from "react";
import style from "./DetailInfoTop.module.css";
import Image from "next/image";
import { carDetailData } from "@/datas/staticCarData";
import { carStatusData } from "@/datas/staticCarData";
import HeaderMenuItem from "@/components/layouts/MenuItem";
import { headerMenuType } from "@/types/headerType";

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
        <div className={style.carStatus}>
          <ul>
            <li>
              <HeaderMenuItem
                menuItem={carStatusData[0]}
                discription={true}
                status="90%"
              />
            </li>
            <li>
              <HeaderMenuItem
                menuItem={carStatusData[1]}
                discription={true}
                status="2023.04.20%"
              />
            </li>
            <li>
              <HeaderMenuItem
                menuItem={carStatusData[2]}
                discription={true}
                status="23원/km"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
