import React from "react";
import MapHeader from "./MapHeader";
import { RecoilRoot } from "recoil";

export default function MapLayout(props: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <MapHeader />
      <div>{props.children}</div>
    </RecoilRoot>
  );
}
