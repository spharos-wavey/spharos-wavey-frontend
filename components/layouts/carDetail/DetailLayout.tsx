import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DetailHeader from "./DetailHeader";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/state/authState";
import LicenseWrapper from "@/components/pages/license/LicenseWrapper";
import { userRentalState } from "@/state/userRentalState";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function DetailLayout(props: { children: React.ReactNode }) {
  const auth = useRecoilValue(authState);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = "Bearer " + auth.token;
  const router = useRouter();

  const [isLicense, setIsLicense] = useState<boolean>(false);
  const [canUserRent, setCanUserRent] = useRecoilState(userRentalState);

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
  }, [auth.uid]);

  const handleCheckNextStep = () => {
    if (!auth.auth && typeof window !== "undefined") {
      sessionStorage.setItem("redirectUrl", `/car/${router.query.cid}`);
      router.push("/require-login");
      return;
    } else setIsLicense(true);
  };
  return (
    <>
      <LicenseWrapper isOpen={isLicense} setIsOpen={setIsLicense} />
      <DetailHeader />
      <div>{props.children}</div>

      {auth.auth && canUserRent ? (
        <BottomFixedContainer backgroundColor="transparent">
          <Button
            btnType="button"
            btnEvent={() => setIsLicense(true)}
            shadow={true}
          >
            면허정보확인
          </Button>
        </BottomFixedContainer>
      ) : auth.auth && !canUserRent ? null : (
        <BottomFixedContainer backgroundColor="transparent">
          <Button
            btnType="button"
            btnEvent={() => handleCheckNextStep()}
            shadow={true}
          >
            예약하기
          </Button>
        </BottomFixedContainer>
      )}
    </>
  );
}
