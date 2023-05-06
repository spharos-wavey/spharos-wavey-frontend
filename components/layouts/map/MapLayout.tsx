import React from "react";
import MapFooter from "./MapFooter";
import DetailHeader from "../carDetail/DetailHeader";
import MapHeader from "./MapHeader";

export default function MapLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <MapHeader />
      <div>{props.children}</div>
      <MapFooter />
    </>
  );
}
