import style from "@/components/pages/main/SpotRecommend.module.css";
import { spotCardType } from "@/types/eventBannerType";
import Image from "next/image";

export default function SpotCard(props: { item: spotCardType }) {
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
              <Image src={props.item.profile} alt="" width="200" height="200" />
            </div>
            <div className={style.writersName}>{props.item.writer}</div>
          </div>
          <div className={style.cardView}>
            <div className={style.visible}>
              <Image
                src="assets/images/icons/visible.svg"
                alt=""
                width="200"
                height="200"
              />
            </div>
            <div className={style.viewCount}>{props.item.viewCount}</div>
            <div className={style.likeHeart}>
              <Image
                src="assets/images/icons/like.svg"
                alt=""
                width="200"
                height="200"
              />
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
