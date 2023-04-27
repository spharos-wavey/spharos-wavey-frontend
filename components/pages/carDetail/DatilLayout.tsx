import React from "react";
import DetailHeader from "./DetailHeader";

export default function DetailLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <DetailHeader />
      <div>{props.children}</div>
    </>
  );
}
