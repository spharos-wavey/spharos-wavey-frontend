import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PageLoader from "@/components/ui/PageLoader";
import { authState } from "@/state/authState";
import { useRouter } from "next/router";
import { carDataType } from "@/types/carDataType";
import axios from "axios";
import style from "./PaymentReady.module.css";
import { nowTimeState } from "@/state/nowTime";

export default function PaymentReady(props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  carData: carDataType;
  fare: number;
}) {
  const auth = useRecoilValue(authState);
  const TOKEN = "Bearer " + auth.token;
  const router = useRouter();
  const vehicleId = router.query.cid;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const reqTime = useRecoilValue(nowTimeState);
  const carData = props.carData;
  const frameInfo = props.carData?.frameInfo;

  const readyRequestBody = {
    uuid: auth.uid,
    vehicleId: Number(vehicleId),
    carName: frameInfo?.carName,
    carBrandName: frameInfo?.carBrand.brandName,
    startDate: reqTime.startTime,
    endDate: reqTime.endTime,
    startZone: carData.place.id,
    returnZone: carData.place.id,
    price: props.fare,
    insuranceId: 1,
    reward: 1000,
  };

  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setIsRedirected(true);
    }, 9000);

    const getPaymentReady = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/purchase/kakao/ready`,
          readyRequestBody,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );
        clearTimeout(timeoutId);
        sessionStorage.setItem("purchaseNumber", res.data.purchaseNumber);
        router.push(res.data.next_redirect_mobile_url);
      } catch (error) {
        setIsRedirected(true);
      }
    };

    getPaymentReady();

    return () => clearTimeout(timeoutId);
  }, []);

  if (isRedirected) {
    return router.push("/purchase/fail");
  }

  return (
    <>
      <div
        className={style.over}
        style={props.isOpen ? { display: "block" } : { display: "none" }}
      >
        <PageLoader text="결제 페이지로 이동합니다." />
      </div>
    </>
  );
}
