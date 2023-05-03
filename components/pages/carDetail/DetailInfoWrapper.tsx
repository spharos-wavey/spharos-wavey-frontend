import React from "react";
import style from "./DetailInfoWrapper.module.css";
import Image from "next/image";
import DetailInfoTop from "./DetailInfoTop";
import Separator from "@/components/ui/Separator";
import DetailLocation from "./DetailLocation";
import DetailInfo from "./DetailInfo";

export default function DetailInfoWrapper() {
  const [isActive, setIsActive] = React.useState(false);
  const handleActive = () => {
    setIsActive(!isActive);
  };
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
