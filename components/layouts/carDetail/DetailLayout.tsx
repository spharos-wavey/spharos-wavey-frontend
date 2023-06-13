import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DetailHeader from "./DetailHeader";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/state/authState";
import LicenseWrapper from "@/components/pages/license/LicenseWrapper";
import { userRentalState } from "@/state/userRentalState";
import TimeSelect from "@/components/modals/TimeSelectModal";
import { timeType } from "@/types/rentalDataType";
import { nowTimeState } from "@/state/nowTime";
import Swal from "sweetalert2";

export default function DetailLayout(props: { children: React.ReactNode }) {
  const auth = useRecoilValue(authState);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = "Bearer " + auth.token;
  const router = useRouter();
  const canCarBeBooked = useRecoilValue<timeType>(nowTimeState);
  const START_TIME = canCarBeBooked.startTime;
  const END_TIME = canCarBeBooked.endTime;
  console.log(START_TIME, END_TIME, "START_TIME, END_TIME");



  const [isLicense, setIsLicense] = useState<boolean>(false);
  const [canUserRent, setCanUserRent] = useRecoilState(userRentalState);
  const [timeModal, setTimeModal] = useState<boolean>(true);
  console.log(canUserRent, "canUserRent");

  useEffect(() => {
    if (auth.auth) {
      const getData = async () => {
        try {
          const res = await fetch(`${API_URL}/rental/can-rental`, {
            method: "GET",
            headers: {
              Authorization: TOKEN,
              uid: auth.uid,
            },
          });
          const data = await res.json();
          setCanUserRent(data);
        } catch (err) {
          console.log(err);
        }
      };
      getData();
    } else {
      return;
    }
  }, [auth.uid, auth.auth, TOKEN, API_URL, setCanUserRent]);



  const canItBeBooked = async () => {
    try {
      const res = await fetch(
        `${API_URL}/vehicle/book-check?id=${router.query.cid}&sDate=${START_TIME}&eDate=${END_TIME}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data, "data");
      if (data === true) {
        sessionStorage.setItem("startTime", START_TIME);
        sessionStorage.setItem("endTime", END_TIME);
        setIsLicense(true);
      }
      else{
        Swal.fire({
          text: "예약이 불가능한 시간입니다",
          icon: "warning",
          confirmButtonText: "확인",
          confirmButtonColor: "var(--billita-primary)",
          timer: 2000,
          timerProgressBar: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAlertTimeSetting = () => {
    Swal.fire({
      text: "시간을 설정해주세요",
      icon: "warning",
      confirmButtonText: "확인",
      confirmButtonColor: "var(--billita-primary)",
      timer: 2000,
      timerProgressBar: false,
    });
  };
  
  const handleCheckNextStep = () => {
    if (START_TIME && END_TIME) {
      canItBeBooked();
    }
    else (
      typeof window !== undefined &&
      !sessionStorage.getItem("startTime") &&
      !sessionStorage.getItem("endTime")
    ) 
    // else if (!auth.auth && typeof window !== "undefined") {
    //   sessionStorage.setItem("redirectUrl", `/car/${router.query.cid}`);
    //   router.push("/require-login");
    // } else setIsLicense(true);
  };


  const handleSetTime = () => {
    setTimeModal(false);
  };

  return (
    <>
      <LicenseWrapper isOpen={isLicense} setIsOpen={setIsLicense} />
      <DetailHeader />
      <TimeSelect setTimeModal={setTimeModal} timeModal={timeModal} />
      <div>{props.children}</div>

      {canUserRent ? (
        <BottomFixedContainer backgroundColor="white" display="flex">
          <Button
            btnType="button"
            btnEvent={() => handleSetTime()}
            shadow={true}
            width={"48%"}
            backgroundColor="#fff"
            color="var(--billita-blueHighlight)"
            border="2px solid var(--billita-blueHighlight)"
          >
            시간수정
          </Button>
          <Button
            btnType="button"
            btnEvent={() => handleCheckNextStep()}
            shadow={true}
            width={"48%"}
          >
            예약하기
          </Button>
        </BottomFixedContainer>
      ) : (
        <></>
      )}
    </>
  );
}
