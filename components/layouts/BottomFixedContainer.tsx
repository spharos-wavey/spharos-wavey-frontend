import React, { ReactNode } from "react";
import style from "./BottomFixedContainer.module.css";

export default function BottomFixedContainer(props: {
  children: ReactNode;
  backgroundColor?: string;
  animation?: boolean;
  radius?: boolean;
  bottom?: string;
  justifyContent?: string;
}) {
  return (
    <div
      className={style.container}
      style={{
        width: "100%",
        display: "flex",
        bottom: `${props.bottom === undefined ? "0" : props.bottom}`,
        justifyContent: `${props.justifyContent === undefined ? "space-between" : props.justifyContent}`,
        borderRadius: `${
          props.radius === undefined ? "0px" : "1rem 1rem 0 0"
        }`,
        padding: 14,
        backgroundColor: `${
          props.backgroundColor === undefined
            ? "var(--billita-white)"
            : props.backgroundColor
        }`,
      }}
    >
      {props.children}
    </div>
  );
}
