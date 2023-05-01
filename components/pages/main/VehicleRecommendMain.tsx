import Separator from "@/components/ui/Separator";
import style from "@/components/pages/main/VehicleRecommendMain.module.css";
import { vehicleMapListIconData } from "@/datas/staticMenuDatas";
import { headerMenuType } from "@/types/headerType";
import TwoIconsRow from "./TwoIconsRow";
import { mainVehicleCardData } from "@/datas/mainEventData";
import { mainVehicleCardType } from "@/types/eventBannerType";
import VehicleCard from "./VehicleCard";
import ScrollDot from "./ScrollDot";

export default function VehicleRecommendMain() {
  return (
    <>
      <Separator gutter={2} />

      <div className={style.sectionWrap}>
        <div className={style.sectionTitle}>지금 후딱 타이소</div>
        <div className={style.twoIconsWrap}>
          {vehicleMapListIconData.map((item: headerMenuType) => {
            return <TwoIconsRow item={item} key={item.id} />;
          })}
        </div>
      </div>

      <Separator gutter={0.4} />

      <div className={style.sectionWrap}>
        <div className={style.overflowWrap}>
          <div className={style.cardsWrap}>
            {mainVehicleCardData.map((item: mainVehicleCardType) => {
              return (
                <VehicleCard item={item} key={item.id}/>
              );
            })}
          </div>
      

        </div>
        <div className={style.scrollDotWrap} >
            {
              mainVehicleCardData.map((item: mainVehicleCardType) => {
                return (
                  <ScrollDot key={item.id} />
                )
              })
            }
        </div>
      </div>

      
    </>
  );
}
