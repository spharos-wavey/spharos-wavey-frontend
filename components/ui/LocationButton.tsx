import React from "react";
import style from "./LocationButton.module.css";
import Image from "next/image";
import Separator from "./Separator";

export default function LocationButton(props: {
  locationName: string | undefined;
  location: string | undefined;
  btnEvent: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <div className={style.container} onClick={props.btnEvent}>
      {/* <div className={style.locationImg}>
        <Image
          src="/assets/images/icons/location.svg"
          width={200}
          height={200}
          alt="slideDownBtn"
        />
      </div> */}
      <div className={style.location}>
        <div
          style={{
            fontSize: "0.8rem",
            fontWeight: "bolder",
            color: "var(--billita-blueHighlight)",
          }}
        >
          {props.locationName}
        </div>
        <div style={{ fontSize: "0.7rem" }}>{props.location}</div>
      </div>
    </div>
  );
}
