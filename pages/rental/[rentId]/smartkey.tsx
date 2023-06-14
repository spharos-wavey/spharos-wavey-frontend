import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { authState } from "@/state/authState";
import { carDataType } from "@/types/carDataType";
import { RentalDetailType } from "@/types/rentalDataType";
import axios from "axios";
import AuthRecoilChecker from "@/components/util/AuthRecoilChecker";
import Button from "@/components/ui/Button";
import style from '@/styles/pages/smartkey.module.css';
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Discription from "@/components/ui/Discription";

export default function SmartkeyPage() {
  const router = useRouter();
  const [drawer, setDrawer] = useState<boolean>(false);
  const [vehicleData, setVehicleData] = useState<carDataType>();
  const [auth, setAuth] = useRecoilState(authState);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = "Bearer " + auth.token;
  const rentId = router.query.rentId as string;
  const [rentData, setRentData] = useState<RentalDetailType>();
  const [doorOpen, setDoorOpen] = useState<boolean>(false);

  useEffect(() => {
    if (AuthRecoilChecker() && typeof window !== undefined) {
      setAuth({
        auth: true,
        token: localStorage.getItem("token") as string,
        uid: localStorage.getItem("uid") as string,
        nickName: localStorage.getItem("nickName") as string,
        email: localStorage.getItem("email") as string,
        profileImageUrl: localStorage.getItem("profileImageUrl") as string,
      });
    }
  }, [setAuth, auth.auth]);

  useEffect(() => {
    if (rentId !== undefined) {
      const getMyRentalData = async () => {
        const result = await axios.get(`${API_URL}/rental?id=${rentId}`, {
          headers: {
            Authorization: TOKEN,
            uid: auth.uid,
          },
        });
        const myRentalData: RentalDetailType = result.data;
        setRentData(myRentalData);
      };
      getMyRentalData();
    }
  }, [API_URL, TOKEN, auth.uid, rentId]);

  const serviceStartTime = new Date(rentData?.startDate as string);
  const serviceEndTime = new Date(rentData?.endDate as string);

  useEffect(() => {
    const getVehicleData = async () => {
      if (rentData !== undefined) {
        const result = await axios.get(
          `${API_URL}/vehicle/${rentData?.vehicleId}`,
          {}
        );
        const v_data: carDataType = result.data;
        setVehicleData(v_data);
      }
    };
    getVehicleData();
  }, [rentData]);

  // useEffect(() => {
  //   if (rentId !== undefined) {
  //     const smartKeyRequest = async () => {
  //       const result = await axios.patch(
  //         `${API_URL}/rental/openKey/${rentId}`,
  //         {
  //           headers: {
  //             Authorization: TOKEN,
  //             uid: auth.uid,
  //           },
  //         }
  //       );
  //       console.log(result);
  //     };
  //     smartKeyRequest();
  //   }
  // }, [rentId, TOKEN, auth.uid]);

  const [showMessage, setShowMessage] = useState(false);
  const [letDoorActivate, setLetDoorActivate] = useState(false);

  useEffect(() => {
    const checkTimeDifference = () => {
      const currentTime = new Date();
      const timeDiffer = serviceEndTime.getTime() - currentTime.getTime();
      const minutesDiffer = Math.floor(timeDiffer / (1000 * 60));

      minutesDiffer <= 10 ? setShowMessage(true) : setShowMessage(false);

      const keyActivateIn15min =
        serviceStartTime.getTime() - currentTime.getTime();
      const keyActivateIn15minMinutes = Math.floor(
        keyActivateIn15min / (1000 * 60)
      );
      keyActivateIn15minMinutes >= 15
        ? setLetDoorActivate(true)
        : setLetDoorActivate(false);
    };
    const interval = setInterval(checkTimeDifference, 10000);
    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [serviceEndTime]);

  const handleReturnAction = () => {
    router.push(`/rental/${rentId}/checklist`);
  };
  const handleEvent = (e: React.FormEvent<HTMLInputElement>) => {
    setDoorOpen(!e.currentTarget.checked);
  };

  return (
    <>
      <main>
        <div className={style.carInfoWrap}>
          <div className={style.carName}>{vehicleData?.frameInfo.carName} {vehicleData?.frameInfo.carBrand.brandName}</div>
          <div className={style.carEtc}>
            <div className={style.carPlate}>{vehicleData?.number}</div>
            {/* <div className={style.battery}>{vehicleData?.charge}%</div> */}
          </div>
        </div>
        <div className={style.imgWrap}>
          {doorOpen ? (
            <Image
              src="/assets/images/car/smartkeyOpen.jpeg"
              width={1000}
              height={1200}
              priority
              alt="smartKey"
            />
          ) : (
            <Image
              src="/assets/images/car/smartKeyClose.jpeg"
              width={1000}
              height={1200}
              priority
              alt="smartKey"
            />
          )}
        </div>
        <div className={style.selectedMessage}>
          {letDoorActivate && (
            <div className={style.statusMessage}>
              운행시작 15분 전부터 차량도어가 제어 가능합니다
            </div>
          )}
          {showMessage && (
            <div className={style.statusMessage}>반납시간 10분 전입니다.</div>
          )}
        </div>

        <div className={style.toggleDisplay}>
          <div>
            <label className={style.switch}>
              <input
                type={style.checkbox}
                onClick={handleEvent}
                checked={doorOpen}
                inputMode="none"
              />
              <span
                className={
                  doorOpen
                    ? `${style.slider} ${style.round} ${style.open}`
                    : `${style.slider} ${style.round} ${style.close}`
                }
              ></span>
            </label>
          </div>
        </div>
        <div className={doorOpen
                    ? `${style.bigText}`
                    : `${style.bigText} ${style.close}`}>
          {doorOpen ? "UNLOCK" : "LOCKED"}
        </div>
        {/* <div className={style.discriptionWrap}>
        <Discription text="차량 도어를 제어합니다." />
        </div> */}
      </main>
      <BottomFixedContainer justifyContent="center">
        <Button
          btnType="button"
          btnEvent={handleReturnAction}
          shadow={true}
          width="50%"
        >
          반납하기
        </Button>
      </BottomFixedContainer>
    </>
  );
}

SmartkeyPage.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="스마트키">{Page}</SimpleBackLayout>;
};
