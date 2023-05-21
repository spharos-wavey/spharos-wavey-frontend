import React, { ReactNode } from "react";

interface buttonStyle {
  children: ReactNode;
  btnType: "button" | "submit" | "reset" | undefined;
  btnEvent: React.MouseEventHandler<HTMLButtonElement> | undefined;
  submitType?: string;
  shadow?: boolean;
  border?: string;
}

export default function Button(props: buttonStyle) {
  return (
    <button
      style={{
        borderRadius: "50px",
        width: "90%",
        height: "3rem",
        border: props.border ? `{props.border}` : "none",
        color: "var(--billita-white)",
        backgroundColor: `${
          props.submitType === "cancel"
            ? "var(--billita-gray)"
            : "var(--billita-blueHighlight)"
        }`,
        margin: "15px 0",
        letterSpacing: "-0.2px",
        boxShadow: `${
          props.shadow ? "0px 4px 4px rgba(255, 73, 116, 0.3)" : "none"
        }`,
        fontSize: "1.1rem",
        whiteSpace: "nowrap",
      }}
      type={props.btnType}
      onClick={props.btnEvent}
    >
      {props.children}
    </button>
  );
}
