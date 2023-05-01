import Image from "next/image";
import { mainVehicleCardType } from "@/types/eventBannerType";
import style from "@/components/pages/main/vehicleRecommendSection/VehicleCard.module.css";
import { useRouter } from "next/router";

export default function VehicleCard(props: { item: mainVehicleCardType }) {

  const router = useRouter();
  return (
    <>
      <div className={style.card} onClick={()=>router.push(`/car/${props.item.id}`)}>
        <div>
          <Image
            src={props.item.carImage}
            width={200}
            height={90}
            alt={props.item.carName}
            priority
          />
        </div>
        <div className={style.saveToggle}>
          <img src="assets/images/icons/saveToggleContaine.svg" />
        </div>
        <div className={style.carTitle}>{props.item.carName}</div>
        <div className={style.greySubTitle}>{props.item.pickUpArea}</div>
      </div>
    </>
  );
}
