import { carDataType, carListType } from "@/types/carDataType";
import React from "react";
import style from "./CarList.module.css"
import Image  from "next/image";

export default function CarList(props: { data: carListType[] }) {
  const data = props.data;
  console.log(data);

  return (
    <div>
      {data.map((item: carListType) => {
        return (
          <div key={item.id} className={style.wrapper}>
            <div className={style.textWrap}>
              <div className={style.carName}> {item.carName}</div>
              <div className={style.period}>
                4월 19일 21:00 - 4월 20일 16:00
              </div>
            </div>
            <div className={style.imgWrap}>
              <Image
                src={item.carImage}
                width="100"
                height="70"
                alt={item.carName}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
