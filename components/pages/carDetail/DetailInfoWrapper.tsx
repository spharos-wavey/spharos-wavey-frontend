import React from "react";
import style from "./DetailInfoWrapper.module.css";
import Image from "next/image";
import DetailInfoTop from "./DetailInfoTop";

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
      </div>
    </>
  );
}
