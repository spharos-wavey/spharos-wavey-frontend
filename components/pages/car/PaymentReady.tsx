import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PageLoader from "@/components/ui/PageLoader";
import { authState } from "@/state/authState";
import { useRouter } from "next/router";
import { BookListDataType, carDataType } from "@/types/carDataType";
import axios from "axios";
import style from "./PaymentReady.module.css"

export default function PaymentReady(props: {
  bookIdData: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  carData: carDataType;
}) {
  const auth = useRecoilValue(authState);
  const TOKEN = "Bearer " + auth.token;
  const router = useRouter();
  const vehicleId = router.query.cid;
  const [uidData, setUidData] = useState<string>();


  const carData = props.carData;
  const frameInfo = props.carData?.frameInfo;
  console.log("auth.uid in payment page", auth.uid);
  console.log("TOKEN", TOKEN);
  console.log("결제준비페이지", props.carData);

  const readyRequestBody = {
    uuid: auth.uid,
    vehicleId: Number(vehicleId),
    carName: frameInfo?.carName,
    carBrandName: frameInfo?.carBrand.brandName,
    startDate: "2023-06-04 20:00",
    endDate: "2023-06-04 22:00",
    startZone: carData.place.id,
    returnZone: carData.place.id,
    price: frameInfo?.defaultPrice,
    insuranceId: 1,
    reward: 1000,
  };
  console.log("readyRequestBody", readyRequestBody);

  useEffect(() => {
    if (props.bookIdData !== undefined) {
      const getPaymentReady = async () => {
        console.log(readyRequestBody);
        const res = await axios.post(
          `https://api-billita.xyz/purchase/kakao/ready`,
          readyRequestBody,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );
        sessionStorage.setItem("tid", res.data.tid);
        console.log(res.data);
        console.log(res.data.purchaseNumber);
        sessionStorage.setItem("purchaseNumber", res.data.purchaseNumber);
        router.push(res.data.next_redirect_pc_url);
      };
      getPaymentReady();
    }
  }, [props.bookIdData]);

  

  return (
    <>
      <div className={style.over} style={ props.isOpen? {display: 'block'} : {display: 'none'}}>
        <PageLoader text="결제 페이지로 이동합니다." />
      </div>
    </>
  );
}
