import React from "react";
import MapHeader from "./MapHeader";
import MapFooter from "./MapFooter";

export default function MapLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <MapHeader />
      <div>{props.children}</div>
      <MapFooter />
    </>
  );
}
