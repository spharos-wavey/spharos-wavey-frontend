import style from "@/components/pages/main/vehicleRecommendSection/VehicleRecommendMain.module.css";
import { mainVehicleCardData } from "@/datas/mainEventData";
import { mainVehicleCardType } from "@/types/eventBannerType";
import VehicleCard from "./VehicleCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VehicleRecommendMain() {
  const [mainCarData, setMainCarData] = useState<mainVehicleCardType[]>([]);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        console.log(`lat, lng`, lat, lng)
      }, error => {
        console.log(error)
      });
    }
  }, [lat, lng]);
  

  useEffect(() => { //api 완료되면 연결. 데이터 타입명도 바꿔야함.
    const getMainCar = async () => {
      try {
        const res = await axios.get(`https://api-billita.xyz/billitazone/now?lat=${lat}&lng=${lng}`);
        const data = res.data;
        setMainCarData(data);
        console.log(mainCarData);
      } catch (err) {
        console.log(err);
      }
    };
    getMainCar();
  },[lat, lng])
  
  return (
    <div>
      <div className={style.sectionTitle}>지금 후딱 타이소</div>
      <div className={style.overflowWrap}>
        <div className={style.cardsWrap}>
          {mainCarData.map((item: mainVehicleCardType) => {
            return (
              <VehicleCard item={item} key={item.vehicleId}/>
            );
          })}
        </div>
      </div>
    </div>
  );
}
