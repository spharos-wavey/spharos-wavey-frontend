import CustomOverlay from "@/components/layouts/map/CustomOverlay";
import MapFooter from "@/components/layouts/map/MapFooter";
import CarListInMapDrawer from "@/components/modals/CarListInMapDrawer";
import PageLoader from "@/components/ui/PageLoader";
import { locationState } from "@/state/location";
import { carInMapType } from "@/types/carDataType";
import { locationType } from "@/types/location";
import { BillitaZoneListType, timeType } from "@/types/rentalDataType";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";

export default function KakaoMap() {

  const [initLoc, setInitLoc] = useState<locationType>({
    latitude: 0,
    longitude: 0,
  });

  const [carLocation, setCarLocation] = useRecoilState(locationState);
  const [billitaZone, setBillitaZone] = useState<string>('');

  const [center, setCenter] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [reqLocation, setReqLocation] = useState<locationType>({
    latitude: 0,
    longitude: 0,
  });

  const [zoneList, setZoneList] = useState<BillitaZoneListType>();

  const [reqTime, setReqTime] = useState<timeType>({
    startTime: "",
    endTime: "",
  });

  const [carInMapList, setCarInMapList] = useState<carInMapType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setReqTime({
      startTime: dayjs().add(10, "minute").format("YYYY-MM-DD HH:mm"),
      endTime: dayjs().add(70, "minute").format("YYYY-MM-DD HH:mm"),
    });
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
           (position) => {
            const time = new Date(position.timestamp);
            // setCurrentLat(position.coords.latitude);
            // setCurrentLng(position.coords.longitude);
            if (carLocation.latitude == 0 && carLocation.longitude == 0) {
              setInitLoc({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              setReqLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            } else {
              setInitLoc({
                latitude: carLocation.latitude,
                longitude: carLocation.longitude,
              });
              setReqLocation({
                latitude: carLocation.latitude,
                longitude: carLocation.longitude,
              });
            }
            setReqTime({
              startTime: dayjs().format("YYYY-MM-DD HH:mm"),
              endTime: dayjs().add(2, "hour").format("YYYY-MM-DD HH:mm"),
            });
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
      latitude: map.getCenter().getLat(),
      longitude: map.getCenter().getLng(),
    });
    setReqLocation({
      latitude: center.latitude,
      longitude: center.longitude,
    });
  };

  useEffect(() => {
    if (
      reqLocation.latitude !== 0 &&
      reqLocation.longitude !== 0 &&
      reqTime !== undefined
    ) {
      const getData = async () => {
        const result = await axios.get(
          `https://api-billita.xyz/billitazone/filter?sDate=${reqTime.startTime}&eDate=${reqTime.endTime}&lat=${reqLocation.latitude}&lng=${reqLocation.longitude}`
        );
        setZoneList(result.data);
        console.log("빌리타존: ", result.data);
      };
      getData();
    }
  }, [reqTime, reqLocation]);

  const overLayClickHandler = (billitaZoneId:number, billitaZoneName:string) => {
    setBillitaZone(billitaZoneName);
    const getData = async () => {
      await fetch(`https://api-billita.xyz/vehicle/billitazone?id=${billitaZoneId}&sDate=${reqTime.startTime}&eDate=${reqTime.endTime}`)
      .then((res) => res.json().then((data) => {
        setCarInMapList(data);
      }
      )).catch((err) => console.log(err));
    }
    getData();
    setIsOpen(true);
  };

  if(!zoneList) return <PageLoader />

  return (
    <>
    <CarListInMapDrawer data={carInMapList} isOpen={isOpen} setIsOpen={setIsOpen} zoneName={billitaZone}/>
      {initLoc.latitude !== 0 && initLoc.longitude !== 0 && (
        <>
          <Map
            center={{ lat: initLoc.latitude, lng: initLoc.longitude }}
            style={{ width: "100%", height: "100vh", position: "fixed", zIndex: 0, top: 0, left: 0 }}
            level={5}
            onCenterChanged={centerChangeHandler}
          >
            {zoneList?.length !== 0 &&
              zoneList?.map((zone) => (
                <CustomOverlay
                  key={zone.billitaZoneId}
                  lat={zone.billitaZoneLat}
                  lng={zone.billitaZoneLng}
                  onClickHandler={()=>overLayClickHandler(zone.billitaZoneId, zone.billitaZoneName)}
                  availableNumber={zone.rentAbleAmount}
                />
              ))}
          </Map>
        </>
      )}
      <MapFooter setReqTime={setReqTime} />
    </>
  );
}

