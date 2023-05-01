import style from "@/components/pages/main/SpotRecommend.module.css";
import { mainSpotData } from "@/datas/mainEventData";
import { spotCardType } from "@/types/eventBannerType";
import SpotCard from "./SpotCard";

export default function SpotCardContainer() {
  return (
    <div className={style.spotCardsWrap}>
        {
          mainSpotData.map((item: spotCardType) => {
            return(
              <SpotCard item={item} key={item.id}/>
            )
          })
        }
    </div>
  );
}
