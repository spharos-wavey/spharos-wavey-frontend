import React from "react";
import style from "./DetailLocation.module.css";
import Title from "@/components/ui/Title";
import LocationButton from "@/components/ui/LocationButton";
import Separator from "@/components/ui/Separator";

export default function DetailLocation() {
  return (
    <>
      <Title title={"Location"} padding="0px" />
      <Separator gutter={0.5} padding={true} />
      <LocationButton btnEvent={() => alert("꺼져")} />
    </>
  );
}
