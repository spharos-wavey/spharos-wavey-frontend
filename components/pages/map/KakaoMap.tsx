import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  const [lat, setLat] = useState<number>(33.5563);
  const [lng, setLng] = useState<number>(126.79581);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // position 객체 내부에 timestamp(현재 시간)와 coords 객체
            const time = new Date(position.timestamp);
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            console.log(position);
            console.log(`현재시간 : ${time}`);
            console.log(`latitude 위도 : ${position.coords.latitude}`);
            console.log(`longitude 경도 : ${position.coords.longitude}`);
          },
          (error) => {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다");
      }
    };

    getLocation();
  }, []);

  return (
    <>
      <Map
        center={{ lat: lat, lng: lng }}
        style={{ width: "100%", height: "100vh" }}
      >
        <MapMarker position={{ lat: lat, lng: lng }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
    </>
  );
}
