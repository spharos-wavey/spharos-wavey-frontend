import React from "react";
import Image from "next/image";
import style from "./DetailInfoTop.module.css";
import MenuItem from "@/components/layouts/MenuItem";
import LocationButton from "@/components/ui/LocationButton";
import { carStatusData } from "@/datas/staticCarData";
import { useRouter } from "next/router";
import Separator from "@/components/ui/Separator";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/location";
interface HeaderType {
  maker: string | undefined;
  type: string | undefined;
  capacity: string | undefined;
  name: string | undefined;
  appearance: string | undefined;
  imageUrl: string | undefined;
  charge: number | undefined;
  wash: string | undefined;
  fare: number | undefined;
  locationName: string | undefined;
  location: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
}

export default function DetailInfoTop({
  maker,
  type,
  capacity,
  name,
  appearance,
  imageUrl,
  charge,
  wash,
  fare,
  locationName,
  location,
  latitude,
  longitude,
}: HeaderType) {

  const [carLocation, setCarLocation] = useRecoilState(locationState);
  const router = useRouter();

  const onClickHandler = () => {
    if (latitude !== undefined && longitude !== undefined) {
      setCarLocation({
        latitude: latitude,
        longitude: longitude,
      });
      router.push("/map");
    }
  };

  return imageUrl !== undefined ? (
    <>
      <div className={style.carName}>{name} - {maker}</div>
      <div className={style.carType}>
        {" "}
        {type} {appearance} {capacity}인승
      </div>
      <Separator gutter={1.3} padding={true} />
      <div className={style.carImage}>
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt={name ? name : "carImage"}
          priority
        />
      </div>
      <LocationButton
        location={location}
        locationName={locationName}
        btnEvent={onClickHandler}
      />
      <div className={style.carStatus}>
        <ul>
          <MenuItem
            menuItem={carStatusData[0]}
            discription={true}
            status={`${charge}%`}
            width="30px"
          />
          <MenuItem
            menuItem={carStatusData[1]}
            discription={true}
            status={`${wash}`}
            width="30px"
          />
          <MenuItem
            menuItem={carStatusData[2]}
            discription={true}
            status={`${fare}원/km`}
            width="30px"
          />
        </ul>
      </div>
    </>
  ) : (
    <></>
  );
}
