import { locationState } from "@/state/location";
import { locationType } from "@/types/location";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";

export default function KakaoMap() {
  const [currentLat, setCurrentLat] = useState<number>(0);
  const [currentLng, setCurrentLng] = useState<number>(0);
  const [initLoc, setInitLoc] = useState<locationType>({
    latitude: 0,
    longitude: 0,
  });
  const [carLocation, setCarLocation] = useRecoilState(locationState);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const router = useRouter();

  console.log("recoil로 넘어온 차 위치 : ", carLocation);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const time = new Date(position.timestamp);
            setCurrentLat(position.coords.latitude);
            setCurrentLng(position.coords.longitude);
            if (carLocation.latitude == 0 && carLocation.longitude == 0) {
              setInitLoc({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            } else {
              setInitLoc({
                latitude: carLocation.latitude,
                longitude: carLocation.longitude,
              });
            }

            console.log("렌더링됨");
            // console.log(`현재위도 : ${position.coords.latitude}`);
            // console.log(`현재경도 : ${position.coords.longitude}`);
            setCarLocation({
              latitude: 0,
              longitude: 0,
            });
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

  const centerChangeHandler = (map: kakao.maps.Map) => {
    setCenter({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
  };

  // console.log("init : ", initLoc);
  // console.log("세팅된 현재 위도 : ", currentLat);
  console.log("센터 좌표 :", center);

  const overLayClickHandler = () => {};

  return initLoc.latitude == 0 && initLoc.longitude == 0 ? (
    <></>
  ) : (
    <>
      <Map
        center={{ lat: initLoc.latitude, lng: initLoc.longitude }}
        style={{ width: "100%", height: "100vh" }}
        level={4}
        onCenterChanged={centerChangeHandler}
      >
        <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
          // 커스텀 오버레이가 표시될 위치입니다
          position={{
            lat: currentLat - 0.001,
            lng: currentLng - 0.001,
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
            onClick={overLayClickHandler}
          >
            <span style={{ fontSize: "0.9rem", lineHeight: "40px" }}>3</span>
          </div>
        </CustomOverlayMap>
      </Map>
    </>
  );
}
