import React, { ReactNode } from "react";
import style from "./BottomFixedContainer.module.css";

export default function BottomFixedContainer(props: { children: ReactNode }) {
  return (
    <div
      className={style.container}
      style={{
        padding: 14,
        background: "linear-gradient(180deg, #ffffff00 0%, #ffffff 10%)",
      }}
    >
      {props.children}
    </div>
  );
}
