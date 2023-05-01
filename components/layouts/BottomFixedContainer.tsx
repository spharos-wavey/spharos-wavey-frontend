import React, { ReactNode } from "react";
import style from "./BottomFixedContainer.module.css";

export default function BottomFixedContainer(props: { children: ReactNode }) {
  return <div className={style.container}>{props.children}</div>;
}
