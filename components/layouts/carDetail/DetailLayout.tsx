import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DetailHeader from "./DetailHeader";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import { useRecoilValue } from "recoil";
import { authState } from "@/state/authState";
import LicenseWrapper from "@/components/pages/license/LicenseWrapper";

export default function DetailLayout(props: { children: React.ReactNode }) {

  const auth = useRecoilValue(authState);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = "Bearer " + auth.token;
  const router = useRouter();

  const [canRental, setCanRental] = useState<boolean>(true);
  const [isLicense, setIsLicense] = useState<boolean>(false);

  useEffect(() => {
    if (auth.auth) {
      const getData = async () => {
        try {
          const res = await fetch(
            `${API_URL}/rental/can-rental`,{
              method: "GET",
              headers: {
                Authorization: TOKEN, 
                uid: auth.uid
              }});
          const data = await res.json();
          setCanRental(data);
        } catch (err) {
          console.log(err);
        }
      }
      getData();
    }
  }, []);

  const handleCheckNextStep = () => {
    setIsLicense(true);
  }

  return (
    <>
      <LicenseWrapper isOpen={isLicense} setIsOpen={setIsLicense}/>
      <DetailHeader />
      <div>{props.children}</div>
      {
        canRental && 
        <BottomFixedContainer backgroundColor="transparent">
          <Button
            btnType={"button"}
            btnEvent={() => handleCheckNextStep()}
            shadow={true}
          >
            예약하기
          </Button>
        </BottomFixedContainer> 
      }
    </>
  );
}
