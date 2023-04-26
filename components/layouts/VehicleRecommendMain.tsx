import Separator from "../ui/Separator";
import style from "@/components/layouts/VehicleRecommendMain.module.css";
import { vehicleMapListIconData } from "@/datas/staticMenuDatas";
import { headerMenuType } from "@/types/headerType";
import TwoIconsRow from "./TwoIconsRow";

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
        <div>
          <div className={style.cardVehicle}>

          </div>
        </div>
      </div>
    </>
  );
}
