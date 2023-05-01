import React from "react";

export default function Title(props: { title: string; padding?: string }) {
  return (
    <div
      style={{
        fontSize: "1.2rem",
        fontWeight: "bold",
        padding: `${props.padding ? props.padding : "16px"}`,
      }}
    >
      {props.title}
    </div>
  );
}
