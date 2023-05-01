import React from "react";
import DetailHeader from "./DetailHeader";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";

export default function DetailLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <DetailHeader />
      <div>{props.children}</div>
      <BottomFixedContainer>
        <Button btnType={"button"} btnEvent={() => alert("g")} shadow={true}>
          예약하기
        </Button>
      </BottomFixedContainer>
    </>
  );
}
