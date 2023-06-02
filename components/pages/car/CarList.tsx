import { carListbyBrandDataType } from "@/types/carDataType";
import style from "./CarList.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import ProgressBar from "@/components/ui/ProgressBar";
import { useSetRecoilState } from "recoil";
import { redirectionUrlState } from "@/state/redirectionState";

export default function CarList(props: { data: carListbyBrandDataType[] }) {
  const carList = props.data;
  const router = useRouter();
  const brandName = router.query.brandName;
  const dataLength = carList.length;

  const setUrlSettion = useSetRecoilState(redirectionUrlState)
  const handleOpenCarDetail = (vehicleId: number) => {
    setUrlSettion({ redirectUrl: router.asPath })
    router.push(`/car/${vehicleId}`);
  };

  return (
    <>
      <div className={style.listHeader}>
        <div className={style.listTitle}>
          <span>빌리타</span>에서 빌려타는 기회!

          <div className={style.description}><span>{dataLength}</span>대의 <span>{brandName}</span>차량이 대기중입니다</div>
        </div>
      </div>
      <div className={style.listBody}>
        {carList.map((item) => {
          return (
            <div
              key={item.vehicleId}
              className={style.cardItem}
              onClick={() => handleOpenCarDetail(item.vehicleId)}
            >
              <div className={style.cardItemText}>
                <div className={style.cardItemTitle}>{item.carName}</div>
                <ProgressBar value={item.charge} />
                <div className={style.price}>
                  {item.defaultPrice.toLocaleString("ko")}원/<span>시간당</span>
                </div>
                <div className={style.distancePrice}>
                  <span>추가거리</span>{" "}
                  {item.distancePrice.toLocaleString("ko")}원/km
                </div>
              </div>
              <div className={style.cardItemImg}>
                <div className={style.badge}>{item.billitaZone}</div>
                <div className={style.imgWrap}>
                  <Image
                    src={item.imageUrl}
                    alt={item.carName}
                    width={100}
                    height={60}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
