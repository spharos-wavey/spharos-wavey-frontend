import {
  carListbyBrandDataType,
} from "@/types/carDataType";
import style from "./CarList.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CarList(props: {
  data: carListbyBrandDataType[];
}) {

  const carList = props.data;
  const router = useRouter();

  const handleOpenCarDetail = (vehicleId:number) => {
    router.push(`/car/${vehicleId}`)
  }

  return (
    <div>
      {carList.map((item) => {
        return (
          <div key={item.vehicleId} className={style.wrapper} onClick={()=>handleOpenCarDetail(item.vehicleId)}>
            <div className={style.textWrap}>
              <div className={style.availability}>
                <span style={{fontWeight:"bold"}}>{item.billitaZone}</span>에서 이용가능
              </div>
              <div className={style.carName}>
                {" "}
                {item.carBrand} {item.carName}
              </div>
            </div>
            <div className={style.imgWrap}>
              <Image
                src={item.imageUrl}
                width="100"
                height="70"
                alt={item.carName}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
