import React from "react";
import InfoTabItem from "./InfoTabItem";

export default function InfoTab() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <InfoTabItem name="옵션정보" isActive={true} />
      <InfoTabItem name="이용방법" isActive={false} />
      <InfoTabItem name="댓글" isActive={false} />
    </div>
  );
}
