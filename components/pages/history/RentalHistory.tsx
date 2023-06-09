import { useEffect, useState } from "react";
import Image from "next/image";
import { carDataType } from "@/types/carDataType";
import { MyRentalCarType } from "@/types/rentalDataType";
import style from "./RentalHistory.module.css";

export default function RentalHistory(props: { rentalData: MyRentalCarType }) {
  const rentalData = props.rentalData;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [carData, setCarData] = useState<carDataType>();

  const useStartDate = new Date(rentalData.startDate);
  const startDate =
    useStartDate.getFullYear() +
    "년 " +
    (useStartDate.getMonth() + 1) +
    "월 " +
    useStartDate.getDate() +
    "일 " +
    useStartDate.getHours() + ":" + useStartDate.getMinutes()

  const useEndDate = new Date(rentalData.endDate);
  // useStartDate.getFullYear() === useEndDate.getFullYear() ? endDate :
  const endDate =
    useStartDate.getFullYear() === useEndDate.getFullYear()
      ? useEndDate.getMonth() +
        1 +
        "월 " +
        useEndDate.getDate() +
        "일 " +
        useEndDate.getHours() + ":" + useEndDate.getMinutes()
      : useEndDate.getFullYear() +
        "년 " +
        (useEndDate.getMonth() + 1) +
        "월 " +
        useEndDate.getDate() +
        "일 " +
        useEndDate.getHours() + ":" + useEndDate.getMinutes()

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

  return (
    <div>
      {carData && (
        <div key={props.rentalData.rentalId} className={style.cardItem}>
          <div className={style.cardItemText}>
            <div className={style.cardItemTitle}>
              {carData.frameInfo.carBrand.brandName} {carData.frameInfo.carName}
            </div>
            <div className={style.price}>
              {props.rentalData && props.rentalData.price.toLocaleString("ko")}
              원
            </div>
            <div className={style.distancePrice}>
              <span>이용정보</span>
              {startDate} - {endDate}
              <span>{props.rentalData.returnZoneId}</span>
            </div>
          </div>
          <div className={style.cardItemImg}>
            <div className={style.badge}>{props.rentalData.purchaseStatus}</div>
            <div className={style.imgWrap}>
              <Image
                src={carData.frameInfo.image}
                alt={
                  carData.frameInfo.carBrand.brandName +
                  carData.frameInfo.carName
                }
                width={100}
                height={60}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
