import KakaoMap from "@/components/pages/map/KakaoMap";
import React from "react";
import MapLayout from "@/components/layouts/map/MapLayout";

export default function Map() {
  return <KakaoMap />;
}

Map.getLayout = function getLayout(Page: React.ReactNode) {
  return <MapLayout>{Page}</MapLayout>;
};
