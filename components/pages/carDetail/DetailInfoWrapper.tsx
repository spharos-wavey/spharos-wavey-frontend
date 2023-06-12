import React, { useState } from "react";
import Image from "next/image";
import DetailInfo from "./DetailInfo";
import DetailInfoTop from "./DetailInfoTop";
import { Map } from "react-kakao-maps-sdk";
import { carDataType } from "@/types/carDataType";
import CustomOverlayCar from "@/components/layouts/map/CustomOverlayCar";
import DetailLocation from "./DetailLocation";
import Separator from "@/components/ui/Separator";
import style from "./DetailInfoWrapper.module.css";

export default function DetailInfoWrapper(props: { carData: carDataType }) {
  const { carData } = props;
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleActive = () => {
    setIsActive(!isActive);
  };
  const frameInfo = carData.frameInfo;
  const guide = frameInfo?.manual;
  const carName = frameInfo?.carName;
  const feature = props.carData.feature;
  return (
    <>
      <div
        className={
          isActive ? `${style.slideDown} ${style.active}` : style.slideDown
        }
        onClick={handleActive}
      >
        <Image
          src="/assets/images/icons/slideDownIcon.svg"
          width={200}
          height={200}
          alt="slideDownBtn"
        />
      </div>
      <div
        className={
          isActive
            ? `${style.topBackContainer} ${style.active}`
            : style.topBackContainer
        }
      >
        <Map
          center={{
            lat: carData?.place.latitude,
            lng: carData?.place.longitude,
          }}
          style={{
            width: "100%",
            height: "400px",
            position: "absolute",
            zIndex: 0,
            top: 0,
            left: 0,
            borderRadius: "1rem",
          }}
          level={5}
          draggable={true}
        >
          <CustomOverlayCar
            lat={carData?.place.latitude}
            lng={carData?.place.longitude}
          />
        </Map>
      </div>
      <div
        className={
          isActive
            ? `${style.innerContainer} ${style.active}`
            : style.innerContainer
        }
      >
        <DetailInfoTop
          maker={frameInfo?.carBrand.brandName}
          capacity={frameInfo?.capacity}
          type={frameInfo?.carType}
          appearance={frameInfo.appearance}
          name={frameInfo?.carName}
          imageUrl={frameInfo?.image}
          charge={carData?.charge}
          wash={carData?.washTime.slice(0, 10).replace(/-/gi, ".")}
          fare={frameInfo?.distancePrice}
        />
        <Separator gutter={1} padding={true} />
        <DetailLocation
          location={carData?.place.zoneAddress}
          locationName={carData?.place.name}
          latitude={carData?.place.latitude}
          longitude={carData?.place.longitude}
        />
        <Separator gutter={1.5} padding={true} />
        {guide && feature && (
          <DetailInfo
            guide={guide}
            carName={carName}
            feature={feature}
            frameInfo={frameInfo}
          />
        )}
      </div>
    </>
  );
}
