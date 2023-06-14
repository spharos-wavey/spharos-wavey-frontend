import React from "react";

export default function InfoTabItem(props: {
  name: string;
  isActive: boolean;
  btnEvent: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <div
      style={{
        textAlign: "center",
        border: "none",
        borderBottom: `${
          props.isActive
            ? "1.8px solid var(--billita-blueHighlight)"
            : "1px solid var(--billita-gray)"
        }`,
        flexGrow: "1",
        padding: "0.5rem 0",
        fontSize: "0.8rem",
        opacity: "80%",
      }}
      onClick={props.isActive ? undefined : props.btnEvent}
    >
      {props.name}
    </div>
  );
}
