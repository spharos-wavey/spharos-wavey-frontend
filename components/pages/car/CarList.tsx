import {
  carDataType,
  carListType,
  carListbyBrandDataType,
} from "@/types/carDataType";
import React, { useEffect, useState } from "react";
import style from "./CarList.module.css";
import Image from "next/image";
import { brandSortType } from "@/types/brandSortType";
import axios from "axios";

export default function CarList(props: {
  data: carListbyBrandDataType[];
  idData: number;
}) {
  const [carList, setCarList] = useState<carListbyBrandDataType[]>([]);
  const [id, setId] = useState<number>();
  const idData = props.idData;
  console.log(`idData 가져왔나요`, idData);

  useEffect(() => {
      axios
        .get(`https://api-billita.xyz/carbrand/maker/${idData}`)
        .then((res) => {
          setCarList(res.data);
        })
        .catch((err) => console.log(err));
  }, [idData]);

  return (
    <div>
      {carList.map((item, index) => {
        console.log(item);
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
