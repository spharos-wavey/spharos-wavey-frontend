import React from "react";
import MapFooter from "./MapFooter";
import DetailHeader from "../carDetail/DetailHeader";
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
