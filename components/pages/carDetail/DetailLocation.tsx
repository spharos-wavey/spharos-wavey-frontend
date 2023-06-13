import React from "react";
import LocationButton from "@/components/ui/LocationButton";
import Separator from "@/components/ui/Separator";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { locationState } from "@/state/location";

export default function DetailLocation(props: {
  locationName: string | undefined;
  location: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
}) {
  const [carLocation, setCarLocation] = useRecoilState(locationState);

  const router = useRouter();
  const onClickHandler = () => {
    if (props.latitude !== undefined && props.longitude !== undefined) {
      setCarLocation({
        latitude: props.latitude,
        longitude: props.longitude,
      });
      router.push("/map");
    }
  };

  return (
    <>
      <Separator gutter={0.5} padding={true} />
      <LocationButton
        location={props.location}
        locationName={props.locationName}
        btnEvent={onClickHandler}
      />
    </>
  );
}
