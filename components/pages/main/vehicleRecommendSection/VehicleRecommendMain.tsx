import style from "@/components/pages/main/vehicleRecommendSection/VehicleRecommendMain.module.css";
import { mainVehicleCardData } from "@/datas/mainEventData";
import { mainVehicleCardType } from "@/types/eventBannerType";
import VehicleCard from "./VehicleCard";

export default function VehicleRecommendMain() {
  return (
    <div>
      <div className={style.sectionTitle}>지금 후딱 타이소</div>
      <div className={style.overflowWrap}>
        <div className={style.cardsWrap}>
          {mainVehicleCardData.map((item: mainVehicleCardType) => {
            return (
              <VehicleCard item={item} key={item.id}/>
            );
          })}
          {mainVehicleCardData.map((item: mainVehicleCardType) => {
            return (
              <VehicleCard item={item} key={item.id}/>
            );
          })}
        </div>
      </div>
    </div>
  );
}
