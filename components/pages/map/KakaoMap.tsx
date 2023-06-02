import CustomOverlay from "@/components/layouts/map/CustomOverlay";
import CarListInMapDrawer from "@/components/modals/CarListInMapDrawer";
import PageLoader from "@/components/ui/PageLoader";
import { locationState } from "@/state/location";
import { nowTimeState } from "@/state/nowTime";
import { carInMapType } from "@/types/carDataType";
import { locationType } from "@/types/location";
import { BillitaZoneListType, timeType } from "@/types/rentalDataType";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";

export default function KakaoMap() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [initLoc, setInitLoc] = useState<locationType>({
    latitude: 0,
    longitude: 0,
  });
  const reqTime = useRecoilValue<timeType>(nowTimeState);
  const [carLocation, setCarLocation] = useRecoilState(locationState);
  const [billitaZone, setBillitaZone] = useState<string>('');
  const [zoneList, setZoneList] = useState<BillitaZoneListType>([] as BillitaZoneListType);
  const [carInMapList, setCarInMapList] = useState<carInMapType[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
           (position) => {
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

  const getApi = (map: kakao.maps.Map) => {

    const lat = map.getCenter().getLat();
    const lng = map.getCenter().getLng();

    setCarLocation({
      latitude: lat,
      longitude: lng,
    });
    
    const getData = async () => {
      const result = await axios.get(
        `${API_URL}/billitazone/filter?sDate=${reqTime.startTime}&eDate=${reqTime.endTime}&lat=${lat}&lng=${lng}`
      );
      setZoneList(result.data);
      console.log("빌리타존: ", result.data);
    };
    getData();
  }

  useEffect(() => {
    if(initLoc.latitude == 0 && initLoc.longitude == 0) return;
    try {
      const getData = async () => {
        const result = await axios.get(
          `${API_URL}/billitazone/filter?sDate=${reqTime.startTime}&eDate=${reqTime.endTime}&lat=${initLoc.latitude}&lng=${initLoc.longitude}`
        );
        setZoneList(result.data);
        console.log("빌리타존: ", result.data);
      }
  
      getData();
    }
    catch(err) {
      console.log(err);
    }
    
    
  }, [reqTime, initLoc]);
  


  const overLayClickHandler = (billitaZoneId:number, billitaZoneName:string) => {
    setBillitaZone(billitaZoneName);
    const getData = async () => {
      await fetch(`${API_URL}/vehicle/billitazone?id=${billitaZoneId}&sDate=${reqTime.startTime}&eDate=${reqTime.endTime}`)
      .then((res) => res.json().then((data) => {
        setCarInMapList(data);
      }
      )).catch((err) => console.log(err));
    }
    getData();
    setIsOpen(true);
  };

  if (zoneList.length === 0) return <PageLoader text={'현재 위치에서 이용가능한 차량을 호출하고 있습니다.'}/> 

  return (
    <>
    <CarListInMapDrawer data={carInMapList} isOpen={isOpen} setIsOpen={setIsOpen} zoneName={billitaZone}/>
      {initLoc.latitude !== 0 && initLoc.longitude !== 0 && (
        <>
          <Map
            center={{ lat: initLoc.latitude, lng: initLoc.longitude }}
            style={{ width: "100%", height: "100vh", position: "fixed", zIndex: 0, top: 0, left: 0 }}
            level={5}
            draggable={true}
            onDragEnd={getApi}
          >
            {zoneList.length !== 0 &&
              zoneList.map((zone) => (
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
    </>
  );
}

