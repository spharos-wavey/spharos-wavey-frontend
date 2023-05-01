import Separator from "@/components/ui/Separator";
import style from "@/components/pages/main/vehicleRecommendSection/VehicleRecommendMain.module.css";
import { vehicleMapListIconData } from "@/datas/staticMenuDatas";
import { headerMenuType } from "@/types/headerType";
import TwoIconsRow from "./TwoIconsRow";
import { mainVehicleCardData } from "@/datas/mainEventData";
import { mainVehicleCardType } from "@/types/eventBannerType";
import VehicleCard from "./VehicleCard";
// import ScrollDot from "./ScrollDot";

export default function VehicleRecommendMain() {
  return (
    <section>
      <div className={style.sectionWrap}>
        <div className={style.sectionTitle}>지금 후딱 타이소</div>
        {/* <div className={style.twoIconsWrap}>
          {vehicleMapListIconData.map((item: headerMenuType) => {
            return <TwoIconsRow item={item} key={item.id} />;
          })}
        </div> */}
        <div className={style.overflowWrap}>
          <div className={style.cardsWrap}>
            {mainVehicleCardData.map((item: mainVehicleCardType) => {
              return (
                <VehicleCard item={item} key={item.id}/>
              );
            })}
          </div>
      
        {/* <div className={style.scrollDotWrap} >
            {
              mainVehicleCardData.map((item: mainVehicleCardType) => {
                return (
                  <ScrollDot key={item.id} />
                )
              })
            }
        </div> */}
      </div>
      </div>
    </section>
  );
}
