import style from "@/components/pages/main/vehicleRecommendSection/VehicleRecommendMain.module.css";
import { mainVehicleCardData } from "@/datas/mainEventData";
import { mainVehicleCardType } from "@/types/eventBannerType";
import VehicleCard from "./VehicleCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VehicleRecommendMain() {
  const [mainCarData, setMainCarData] = useState<mainVehicleCardType[]>([]);

  useEffect(() => { //api 완료되면 연결. 데이터 타입명도 바꿔야함.
    const getMainCar = async () => {
      try {
        const res = await axios.get("https://api-billita.xyz/billitazone/now");
        const data = res.data;
        setMainCarData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMainCar();
  },[])
  
  return (
    <div>
      <div className={style.sectionTitle}>지금 후딱 타이소</div>
      <div className={style.overflowWrap}>
        <div className={style.cardsWrap}>
          {mainCarData.map((item: mainVehicleCardType) => {
            return (
              <VehicleCard item={item} key={item.id}/>
            );
          })}
        </div>
      </div>
    </div>
  );
}
