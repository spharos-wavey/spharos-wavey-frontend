import React from "react";
import Title from "@/components/ui/Title";
import LocationButton from "@/components/ui/LocationButton";
import Separator from "@/components/ui/Separator";
import { useRouter } from "next/router";

export default function DetailLocation(props: {
  locationName: string | undefined;
  location: string | undefined;
}) {
  const router = useRouter();
  return (
    <>
      <Title title={"Location"} padding="0px" />
      <Separator gutter={0.5} padding={true} />
      <LocationButton
        location={"부산시 해운대구 우동 센텀리더스마크 지하 1층"}
        locationName={props.locationName}
        btnEvent={() => router.push("/map")}
      />
    </>
  );
}
