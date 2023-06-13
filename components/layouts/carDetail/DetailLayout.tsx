import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DetailHeader from "./DetailHeader";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "@/state/authState";
import LicenseWrapper from "@/components/pages/license/LicenseWrapper";
import { userRentalState } from "@/state/userRentalState";
import TimeSelect from "@/components/modals/TimeSelectModal";
import Discription from "@/components/ui/Discription";
import axios from "axios";
import { bookIdState } from "@/state/bookIdState";
import { nowTimeState } from "@/state/nowTime";
import dayjs from "dayjs";

export interface RequestType {
  vehicleId: number;
  startDate: string;
  endDate: string;
}

export default function DetailLayout(props: { children: React.ReactNode }) {
  const auth = useRecoilValue(authState);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = "Bearer " + auth.token;
  const router = useRouter();
  const setBookId = useSetRecoilState(bookIdState);
  const [requestBody, setRequestBody] = useState<RequestType>(
    {
      vehicleId: Number(router.query.cid),
      startDate: dayjs().add(10, "minute").format("YYYY-MM-DD HH:mm"),
      endDate: dayjs().add(70, "minute").format("YYYY-MM-DD HH:mm"),
    }
  );
  const [licenseModal, setIsLicenseModal] = useState<boolean>(false);
  const [isLicense, setIsLicense] = useState<boolean>(false);
  const [canUserRent, setCanUserRent] = useRecoilState(userRentalState);
  const [timeModal, setTimeModal] = useState<boolean>(true);
  const [reqTime, setReqTime] = useRecoilState(nowTimeState);
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

  useEffect(() => {

    if (reqTime.startTime && reqTime.endTime) {
      setRequestBody({
        vehicleId: Number(router.query.cid),
        startDate: String(reqTime.startTime),
        endDate: String(reqTime.endTime),
      });
      return;
    }
  }, [isLicense]);

  const handleAlertTimeSetting = () => {
  //   Swal.fire({
  //     text: "시간을 설정해주세요",
  //     icon: "warning",
  //     confirmButtonText: "확인",
  //     confirmButtonColor: "var(--billita-primary)",
  //     timer: 2000,
  //     timerProgressBar: false,
  //   });
  };

  const postBookData = async () => {
    try {
      console.log(requestBody, "requestBody");
      const res = await axios.post(`${API_URL}/booklist`, requestBody, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const data = res.data;
      console.log(data)
      if( !data.bookId ) return;
      setBookId(data.bookId);
      setReqTime({
        startTime: requestBody.startDate,
        endTime: requestBody.endDate,
      })
      router.push(`/car/${router.query.cid}/book`);
    } catch (err) {
      console.log(err);
    }
  }
  const handleCheckNextStep = () => {
    if (!auth.auth && typeof window !== "undefined") {
      sessionStorage.setItem("redirectUrl", `/car/${router.query.cid}`);
      router.push("/require-login");
    } else {
      if(!isLicense){
        setIsLicenseModal(true)
        return;
      } 
      postBookData();
    };
  };

  const handleSetTime = () => {
    setTimeModal(false);
  };

  return (
    <>
      <LicenseWrapper isOpen={licenseModal} setIsOpen={setIsLicenseModal} setIsLicense={setIsLicense}/>
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
            {isLicense ? '예약하기' : '면허확인'}
          </Button>
        </BottomFixedContainer>
      ) : (
        <BottomFixedContainer justifyContent="center">
          <Discription text="이미 대여중이 차량이 있습니다."/>
        </BottomFixedContainer>
      )}
    </>
  );
}
