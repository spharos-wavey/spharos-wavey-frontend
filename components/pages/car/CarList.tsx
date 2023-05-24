import {
  carListbyBrandDataType,
} from "@/types/carDataType";
import style from "./CarList.module.css";
import Image from "next/image";

export default function CarList(props: {
  data: carListbyBrandDataType[];
}) {

  const carList = props.data;

  return (
    <div>
      {carList.map((item, index) => {
        return (
          <div key={index} className={style.wrapper}>
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
