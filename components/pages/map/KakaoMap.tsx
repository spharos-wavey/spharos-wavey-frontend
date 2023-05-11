import React, { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  const [lat, setLat] = useState<number>(33.5563);
  const [lng, setLng] = useState<number>(126.79581);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        // GPS를 지원하면
        console.log(navigator);
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

  const handleClick = () => {
    // console.log(target.current);
    // if(target.current === null) return;
    // console.log(target.current.T.Yj)
    // target.current.T.Yj = '/assets/images/icons/locateIcon.svg';
    console.log("뭐");
  };

  return (
    <>
      <Map
        center={{ lat: lat, lng: lng }}
        style={{ width: "100%", height: "100vh" }}
        level={4}
      >
        <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
          // 커스텀 오버레이가 표시될 위치입니다
          position={{
            lat: lat - 0.001,
            lng: lng - 0.001,
          }}
        >
          {/* 커스텀 오버레이에 표시할 내용입니다 */}
          <div
            className="label"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "70%",
              color: "white",
              backgroundColor: "var(--billita-blue)",
              textAlign: "center",
            }}
            onClick={handleClick}
          >
            <span style={{ fontSize: "0.9rem", lineHeight: "40px" }}>3</span>
          </div>
        </CustomOverlayMap>
      </Map>
    </>
  );
}
