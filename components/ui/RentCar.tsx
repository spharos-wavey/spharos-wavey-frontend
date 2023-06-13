import { authState } from "@/state/authState";
import { IsUserRentalNowDataType, MyRentalCarType } from "@/types/rentalDataType";
import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import style from "../modals/ModalSideBar.module.css";
import SectionTitle from "./SectionTitle";
import Separator from "./Separator";
import DataLoader from "./DataLoader";

const RentCar = (props: {
  rentCarData: MyRentalCarType;
  setIsSideOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const TOKEN = "Bearer " + auth.token;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { rentCarData } = props;
  const [summaryData, setSummaryData] = useState<IsUserRentalNowDataType>();

  useEffect(() => {
    const getCurrentRentKeyData = async () => {
      try {
        
        const res = await axios.get(
          `${API_URL}/booklist/summary/${rentCarData.vehicleId}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );
        const data = res.data;
        setSummaryData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentRentKeyData();
  }, [API_URL, TOKEN, rentCarData.vehicleId]);

  const handlePush = () => {
    props.setIsSideOpen(false);
    router.push(`/rental/${rentCarData.rentalId}`);
  };
  const serviceStartTime = new Date(rentCarData.startDate);
  const serviceEndTime = new Date(rentCarData.endDate);

  return (
    <>
    {
      summaryData ? 
        <div className={style.grayWrapper} onClick={handlePush}>
          <div className={style.paddingWrap}>
            <SectionTitle fontSize={1}>대여 차량</SectionTitle>
            <Separator gutter={1.2} />
            <div className={style.reserveWrapper}>
              <div className={style.textWrap}>
                <div className={style.carName}>
                  {summaryData?.brandName} {summaryData.carName}
                </div>
                <div className={style.period}>
                  {serviceStartTime.getMonth() + 1}월 {serviceStartTime.getDate()}일{" "}
                  {serviceStartTime.getHours()}:
                  {String(serviceStartTime.getMinutes()).padStart(2, "0")} -{" "}
                  {serviceEndTime.getMonth() + 1}월 {serviceEndTime.getDate()}일{" "}
                  {serviceEndTime.getHours()}:
                  {String(serviceEndTime.getMinutes()).padStart(2, "0")}
                </div>
              </div>
              <div className={style.imgWrap}>
                <Image
                  src={summaryData.imageUrl}
                  width="300"
                  height="300"
                  alt={summaryData.carName}
                />
              </div>
            </div>
          </div>
        </div>
        : <DataLoader />
    }
    </>
  );
};

export default RentCar;
