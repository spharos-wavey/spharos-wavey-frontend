import React from "react";
import { useRouter } from "next/router";
import DetailHeader from "./DetailHeader";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";

export default function DetailLayout(props: { children: React.ReactNode }) {
  const router = useRouter();
  const cid = router.query.cid;
  const handleCheckNextStep = () => {
    router.push(`/car/${cid}/license`);
  }
  return (
    <>
      <DetailHeader />
      <div>{props.children}</div>
      <BottomFixedContainer backgroundColor="transparent">
        <Button
          btnType={"button"}
          btnEvent={() => handleCheckNextStep()}
          shadow={true}
        >
          예약하기
        </Button>
      </BottomFixedContainer>
    </>
  );
}
