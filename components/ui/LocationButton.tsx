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
      <div className={style.locationImg}>
        <Image
          src="/assets/images/icons/fare.png"
          width={200}
          height={200}
          alt="slideDownBtn"
        />
      </div>
      <div className={style.location}>
        <div
          style={{
            fontSize: "1rem",
            fontWeight: "bolder",
            color: "var(--billita-blueHighlight)",
          }}
        >
          {props.locationName}
        </div>
        <Separator gutter={0.3} padding={true} />
        <div style={{ fontSize: "0.8rem" }}>{props.location}</div>
      </div>
    </div>
  );
}
