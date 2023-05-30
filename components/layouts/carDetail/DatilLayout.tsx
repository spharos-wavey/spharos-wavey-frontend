import React from "react";
import { useRouter } from "next/router";
import DetailHeader from "./DetailHeader";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Swal from "sweetalert2";

export default function DetailLayout(props: { children: React.ReactNode }) {
  const router = useRouter();
  const cid = router.query.cid;
  const handleLicensePage = () => {
    router.push(`/car/${cid}/license`);
    sessionStorage.removeItem("carDetail");
  };

  const handleLoginPage = () => {
    sessionStorage.setItem("carDetail", `car/${cid}`);
    router.push("/login");
  };
  
  const swalPopLoginToGo = () => {
    Swal.fire({
      text: "로그인이 필요합니다.",
      icon: "success",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
    });
    }

  const isLogin = () => {
    if (
      !localStorage.getItem("Authorization") &&
      !localStorage.getItem("uid")
    ) {
      swalPopLoginToGo();
      handleLoginPage();
    } else {
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
