import React from "react";
import style from "./RentalTop.module.css";
import MenuItem from "@/components/layouts/MenuItem";
import { carStatusData } from "@/datas/staticCarData";
import ChargeInfo from "./ChargeInfo";
import Image from "next/image";


export default function RentalTop({
  rentalId,
  carModel,
  imageUrl,
  charge,
  fare,
  startTime,
  endTime,
  totalRentTime,
  billitazone,
  rentalfee,
  insurancefee,
}) {
  return (
  
    <div className={style.topWrap}>
      <div className={style.carImage}>
        <Image
          src={imageUrl || ""}
          width={200}
          height={200}
          alt={rentalId || "차량이미지"}
          priority
        />
      </div>
      <div className={style.carName}>Tesla Model 3</div>
      <div className={style.charge}>75%</div>
    </div>
    
  );
}
