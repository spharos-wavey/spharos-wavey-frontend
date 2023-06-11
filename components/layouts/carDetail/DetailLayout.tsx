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
import Swal from "sweetalert2";

export default function DetailLayout(props: { children: React.ReactNode }) {
  const auth = useRecoilValue(authState);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = "Bearer " + auth.token;
  const router = useRouter();

  const [isLicense, setIsLicense] = useState<boolean>(false);
  const [canUserRent, setCanUserRent] = useRecoilState(userRentalState);
  const [timeModal, setTimeModal] = useState<boolean>(true);

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
          console.log(data, "check with api can-rental");
        } catch (err) {
          console.log(err);
        }
      };
      getData();
    } else {
      return;
    }
  }, [auth.uid, auth.auth, TOKEN, API_URL, setCanUserRent]);

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
    if (!auth.auth && typeof window !== "undefined") {
      sessionStorage.setItem("redirectUrl", `/car/${router.query.cid}`);
      router.push("/require-login");
      return;
    } else if (
      typeof window !== "undefined" &&
      !sessionStorage.getItem("startTime") &&
      !sessionStorage.getItem("endTime")
    ) {
      handleAlertTimeSetting();
    } else setIsLicense(true);
  };

  const handleSetTime = () => {
    setTimeModal(false);
  };

  console.log(canUserRent, "canUserRent");
  return (
    <>
      <LicenseWrapper isOpen={isLicense} setIsOpen={setIsLicense} />
      <DetailHeader />
      <TimeSelect setTimeModal={setTimeModal} timeModal={timeModal} />
      <div>{props.children}</div>

      {canUserRent.canUserBook ? (
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
