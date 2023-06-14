import React from "react";
import style from "./LocationButton.module.css";

export default function LocationButton(props: {
  locationName: string | undefined;
  location: string | undefined;
}) {
  return (
    <div className={style.container}>
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
