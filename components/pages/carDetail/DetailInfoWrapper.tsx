import React, { useEffect, useState } from "react";
import style from "./DetailInfoWrapper.module.css";
import Image from "next/image";
import DetailInfoTop from "./DetailInfoTop";
import Separator from "@/components/ui/Separator";
import DetailLocation from "./DetailLocation";
import DetailInfo from "./DetailInfo";
import axios from "axios";
import { useRouter } from "next/router";
import { carDataType } from "@/types/carDataType";

export default function DetailInfoWrapper() {
  const [isActive, setIsActive] = useState(false);
  const [carData, setCarData] = useState<carDataType>();
  const router = useRouter();

  const handleActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (router.query.cid !== undefined) {
      const getData = async () => {
        const result = await axios.get(
          `https://api-billita.xyz/vehicle/${router.query.cid}`
        );
        console.log(result.data);
        console.log(result.data.image);
        setCarData(result.data);
      };
      getData();
    }
  }, [router.query]);

  return (
    <>
      <div
        className={
          isActive ? `${style.slideDown} ${style.active}` : style.slideDown
        }
        onClick={handleActive}
      >
        <Image
          src="/assets/images/icons/slideDownIcon.svg"
          width={200}
          height={200}
          alt="slideDownBtn"
        />
      </div>
      <div
        className={
          isActive
            ? `${style.topBackContainer} ${style.active}`
            : style.topBackContainer
        }
      ></div>
      <div
        className={
          isActive
            ? `${style.innerContainer} ${style.active}`
            : style.innerContainer
        }
      >
        <DetailInfoTop
          name={carData?.frameInfo.name}
          imageUrl={carData?.image}
          charge={carData?.charge}
          wash={carData?.washTime.slice(0, 10).replace(/-/gi, ".")}
          fare={carData?.frameInfo.distancePrice}
        />
        <Separator gutter={1} padding={true} />
        <DetailLocation />
        <Separator gutter={1.5} padding={true} />
        <DetailInfo />
      </div>
    </>
  );
}
