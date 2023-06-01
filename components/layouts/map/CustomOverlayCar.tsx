import React from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import Image from "next/image";

export default function CustomOverlayCar(props:{
  lat: number,
  lng: number,
}) {

  const {lat, lng} = props;
  return (
    <CustomOverlayMap
      position={{
        lat: lat,
        lng: lng,
      }}
    >
      <div
        className="label"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          color: "white",
          backgroundColor: "var(--billita-blue)",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src='/assets/images/icons/car-white.svg' width={12} height={12} alt='carIcon' />
      </div>
    </CustomOverlayMap>
     
  );
}
