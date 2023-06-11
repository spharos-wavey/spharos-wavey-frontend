import KakaoMap from "@/components/pages/map/KakaoMap";
import React from "react";
import MapLayout from "@/components/layouts/map/MapLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Map() {
  return <KakaoMap />;
}

Map.getLayout = function getLayout(Page: React.ReactNode) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MapLayout>{Page}</MapLayout>
    </LocalizationProvider>
  );
};
