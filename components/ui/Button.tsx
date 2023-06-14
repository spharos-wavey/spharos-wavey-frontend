import React, { ReactNode } from "react";

interface ButtonStyle {
  children: ReactNode;
  btnType: "button" | "submit" | "reset" | undefined;
  btnEvent: React.MouseEventHandler<HTMLButtonElement> | undefined;
  submitType?: string;
  shadow?: boolean;
  border?: string;
  backgroundColor?: string | undefined;
  color?: string | undefined;
  fontWeight?: string | undefined;
  width?: string;
}

export default function Button(props: ButtonStyle) {
  return (
    <button
      style={{
        borderRadius: "50px",
        width: props.width? props.width : "90%",
        height: "3rem",
        border: props.border ? props.border : "none",
        color: props.color === undefined ? "var(--billita-white)" : props.color,
        margin: "15px 0",
        letterSpacing: "-0.5px",
        boxShadow: `${
          props.shadow ? "0px 4px 4px rgba(255, 73, 116, 0.3)" : "none"
        }`,
        fontSize: "1.1rem",
        whiteSpace: "nowrap",
        fontWeight: props.fontWeight === undefined? "normal" : props.fontWeight,
        backgroundColor: 
          props.backgroundColor === undefined
            ? "var(--billita-blueHighlight)"
            : props.backgroundColor
        ,
      }}
      type={props.btnType}
      onClick={props.btnEvent}
    >
      {props.children}
    </button>
  );
}
