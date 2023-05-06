import React, { useEffect } from "react";
import style from "./DetailInfoWrapper.module.css";
import Image from "next/image";
import DetailInfoTop from "./DetailInfoTop";
import Separator from "@/components/ui/Separator";
import DetailLocation from "./DetailLocation";
import DetailInfo from "./DetailInfo";
import axios from "axios";
import getData from "@/hooks/getData";
import { useRouter } from "next/router";

export default function DetailInfoWrapper() {
  const [isActive, setIsActive] = React.useState(false);
  const handleActive = () => {
    setIsActive(!isActive);
  };

  const router = useRouter();
  console.log(router.query.cid);

  useEffect(() => {
    if (router.query.cid !== undefined) {
      const getData = async () => {
        const result = await axios.get(
          `https://api-billita.xyz/vehicle/${router.query.cid}`
        );
        console.log(result);
      };

      getData();
    }
  }, [router.query]);

  // getData(`vehicle/${router.query.cid}`);

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
        <DetailInfoTop />
        <Separator gutter={1} padding={true} />
        <DetailLocation />
        <Separator gutter={1.5} padding={true} />
        <DetailInfo />
      </div>
    </>
  );
}
