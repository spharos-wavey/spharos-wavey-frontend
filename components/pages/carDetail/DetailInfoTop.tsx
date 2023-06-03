import React from "react";
import Image from "next/image";
import style from "./DetailInfoTop.module.css";
import MenuItem from "@/components/layouts/MenuItem";
import { carStatusData } from "@/datas/staticCarData";
import Separator from "@/components/ui/Separator";

interface HeaderType {
  maker: string | undefined;
  type: string | undefined;
  capacity: string | undefined;
  name: string | undefined;
  appearance: string | undefined;
  imageUrl: string | undefined;
  charge: number | undefined;
  wash: string | undefined;
  fare: number | undefined;
}

export default function DetailInfoTop({
  maker,
  type,
  capacity,
  name,
  appearance,
  imageUrl,
  charge,
  wash,
  fare,
}: HeaderType) {
  return imageUrl !== undefined ? (
    <>
      <div className={style.maker}>{maker}</div>
      <div className={style.carName}>{name}</div>
      <div className={style.carType}>
        {" "}
        {type} {appearance} {capacity}인승
      </div>
      <Separator gutter={1.3} padding={true} />
      <div className={style.carImage}>
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt={name || ""}
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
  ) : (
    <></>
  );
}
