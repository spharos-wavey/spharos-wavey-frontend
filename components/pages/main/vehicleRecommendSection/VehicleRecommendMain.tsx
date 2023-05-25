import style from "@/components/pages/main/vehicleRecommendSection/VehicleRecommendMain.module.css";
import { mainVehicleCardType } from "@/types/eventBannerType";
import VehicleCard from "./VehicleCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function VehicleRecommendMain() {
  const [mainCarData, setMainCarData] = useState<mainVehicleCardType[]>();
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
  
  useEffect(() => { 
    if (lat === 0 && lng === 0) return;
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
      {mainCarData === undefined ? <MyLoader /> : 
        mainCarData.length === 0 ? <div className={style.noCar}>현재 위치에서 조회된 차량이 없습니다.</div> :
        <div className={style.cardsWrap}>
          {
            mainCarData.map((item: mainVehicleCardType) => {
              return (
                <VehicleCard item={item} key={item.vehicleId}/>
              );
            })
          }
        </div>
      }
      </div>
    </div>
  );
}

export const MyLoader = () => {
  return (
    <div className={style.myLoader}>
      <div className={style.loader}>
        <Image src="/assets/images/etc/loader.svg" width={30} height={30} alt='loader'/>
      </div>
      <p>현재위치에서 사용가능한 차량을<br/>불러오고 있습니다.</p>
    </div>
  )
}
