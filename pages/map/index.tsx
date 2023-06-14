import KakaoMap from "@/components/pages/map/KakaoMap";
import React from "react";
import MapLayout from "@/components/layouts/map/MapLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSetRecoilState } from "recoil";
import { locationState } from "@/state/location";

export default function Map() {
  const setCarLocation = useSetRecoilState(locationState);
  setCarLocation({
    latitude: 0,
    longitude: 0,
  });
  return <KakaoMap />;
}

Map.getLayout = function getLayout(Page: React.ReactNode) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MapLayout>{Page}</MapLayout>
    </LocalizationProvider>
  );
};
