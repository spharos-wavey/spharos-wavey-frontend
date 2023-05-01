import style from "@/components/pages/main/SpotRecommend.module.css";
import { spotCardType } from "@/types/eventBannerType";
import Image from "next/image";

export default function SpotCard(props: { item: spotCardType }) {
  console.log(props.item.img);
  return (
    <div>
    <div className={style.spotCardImg}>
      <Image
        src="assets/images/dummy/lotteWorld.svg"
        alt={props.item.spotName}
        width={600}
        height={600}
        priority
      />
    </div>
    <div className={style.spotCardInfo}>
    <div className={style.cardInfoTop}>
      <div className={style.writer}>
        <div className={style.profile}>
          <img src={props.item.profile} />
        </div>
        <div className={style.writersName}>{props.item.writer}</div>
      </div>
      <div className={style.cardView}>
        <div className={style.visible}>
          <img src="assets/images/icons/visible.svg" />
        </div>
        <div className={style.viewCount}>{props.item.viewCount}</div>
        <div className={style.likeHeart}>
          <img src="assets/images/icons/like.svg" />
        </div>
      </div>
    </div>
    <div className={style.spotName}>
      {props.item.spotName}
      현재위치에서{" "}
      <span className={style.minutes}>{props.item.distanceInMinutes}</span>
      분컷
    </div>
  </div>
  </div>
  );
}
