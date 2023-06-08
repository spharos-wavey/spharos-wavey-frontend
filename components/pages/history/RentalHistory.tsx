import { useEffect, useState } from "react";
import Image from "next/image";
import { carDataType } from "@/types/carDataType";
import { MyRentalCarType } from "@/types/rentalDataType";
import style from "./RentalHistory.module.css";

export default function RentalHistory(props: { rentalData: MyRentalCarType }) {
  const rentalData = props.rentalData;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [carData, setCarData] = useState<carDataType>();

  useEffect(() => {
    const getVehicleData = async () => {
      const res = await fetch(`${API_URL}/vehicle/${rentalData.vehicleId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCarData(data);
      return data;
    };
    getVehicleData();
  }, []);

  return <div>{carData && (

    <div
    key={props.rentalData.rentalId}
    className={style.cardItem}
  >
    <div className={style.cardItemText}>
      <div className={style.cardItemTitle}>{carData.frameInfo.carBrand.brandName} {carData.frameInfo.carName}</div>
      <div className={style.price}>
        {/* {props.rentalData && props.rentalData.price.toLocaleString("ko")}원 */}
      </div>
      <div className={style.distancePrice}>
        <span>이용금액</span>
      </div>
    </div>
    <div className={style.cardItemImg}>
      {/* <div className={style.badge}>{props.rentalData.returnZoneId}</div> */}
      <div className={style.imgWrap}>
        <Image
          src={carData.frameInfo.image}
          alt={carData.frameInfo.carBrand.brandName + carData.frameInfo.carName}
          width={100}
          height={60}
        />
      </div>
    </div>
  </div>
  )}</div>;
}
