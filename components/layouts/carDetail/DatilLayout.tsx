import React from "react";
import { useRouter } from "next/router";
import DetailHeader from "./DetailHeader";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";

export default function DetailLayout(props: { children: React.ReactNode }) {
  const router = useRouter();
  const handleLicensePage = () => {
    sessionStorage.setItem("carDetail", router.asPath);
    router.push("/license");
  };
  const handleLoginPage = () => {
    sessionStorage.setItem("carDetail", router.asPath);
    console.log(router.asPath);
    router.push("/login");
  };
  const isLogin = () => {
    if (
      !localStorage.getItem("Authorization") &&
      !localStorage.getItem("uid")
    ) {
      alert("로그인이 필요합니다.");
      handleLoginPage();
    } else {
      alert("로그인 언제했지 호호");
      handleLicensePage();
    }
  };
  const handleCheckNextStep = () => {
    isLogin();
  };

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
