import React from "react";
import Image from "next/image";
import style from "./DetailInfoTop.module.css";
import MenuItem from "@/components/layouts/MenuItem";
import { carDetailData, carStatusData } from "@/datas/staticCarData";
import Separator from "@/components/ui/Separator";

interface headerType {
  name: string | undefined;
  imageUrl: string | undefined;
  charge: number | undefined;
  wash: string | undefined;
  fare: number | undefined;
}

export default function DetailInfoTop({
  name,
  imageUrl,
  charge,
  wash,
  fare,
}: headerType) {
  return (
    <>
      <div className={style.carName}>{name}</div>
      <Separator gutter={1.3} padding={true} />
      <div className={style.carImage}>
        <Image
          src={imageUrl || ""}
          width={200}
          height={200}
          alt={name || "사진"}
          priority
        />
      </div>
      <div className={style.carStatus}>
        <ul>
          <MenuItem
            menuItem={carStatusData[0]}
            discription={true}
            status={`${charge}%`}
            width="40%"
          />
          <MenuItem
            menuItem={carStatusData[1]}
            discription={true}
            status={`${wash}`}
            width="40%"
          />
          <MenuItem
            menuItem={carStatusData[2]}
            discription={true}
            status={`${fare}원/km`}
            width="40%"
          />
        </ul>
      </div>
    </>
  );
}
