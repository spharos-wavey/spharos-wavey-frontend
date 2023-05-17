import React, { ReactNode } from "react";
import style from "./BottomFixedContainer.module.css";

export default function BottomFixedContainer(props: {
  children: ReactNode;
  backgroundColor: string;
  animation?: boolean;
}) {
  return (
    <div
      className={style.container}
      style={{
        backgroundColor: `${
          props.backgroundColor === "white"
            ? "var(--billita-white)"
            : "transparent"
        }`,
      }}
    >
      {props.children}
    </div>
  );
}
