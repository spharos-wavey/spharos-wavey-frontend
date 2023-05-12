import { locationState } from "@/state/location";
import { locationType } from "@/types/location";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";

export default function KakaoMap() {
  const [currentLat, setCurrentLat] = useState<number>(33.5563);
  const [currentLng, setCurrentLng] = useState<number>(126.79581);
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
  // console.log("router: ", router);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const time = new Date(position.timestamp);
            setCurrentLat(position.coords.latitude);
            setCurrentLng(position.coords.longitude);
            // console.log(position);
            // console.log(`현재시간 : ${time}`);
            // console.log(`현재위도 : ${position.coords.latitude}`);
            // console.log(`현재경도 : ${position.coords.longitude}`);
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

  useEffect(() => {
    setInitLoc((loc) => {
      const tempLoc = { ...loc };
      if (carLocation.latitude !== 0 && carLocation.longitude !== 0) {
        (loc.latitude = carLocation.latitude),
          (loc.longitude = carLocation.longitude);
      } else {
        (loc.latitude = currentLat), (loc.longitude = currentLng);
      }
      return tempLoc;
    });
  }, [currentLat, currentLng]);

  console.log("recoil로 넘어온 차 위치 : ", carLocation);

  const centerChangeHandler = (map: kakao.maps.Map) => {
    setCenter({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
    setCarLocation({
      latitude: 0,
      longitude: 0,
    });
  };

  console.log("init : ", initLoc);
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
