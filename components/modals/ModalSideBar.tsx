import * as React from "react";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./ModalSideBar.module.css";
import SectionTitle from "../ui/SectionTitle";
import Separator from "../ui/Separator";
import { useRouter } from "next/router";
import { RentalData } from "@/datas/RentalData";
import { rentalDataType } from "@/types/rentalDataType";
import axios from "axios";

export default function ModalSideBar(props: {
  setIsSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSideOpen: boolean;
}) {
  const { isSideOpen, setIsSideOpen } = props;
  const [rentCarData, setRentCarData] = useState<rentalDataType>(
    {} as rentalDataType
  );
  const router = useRouter();
  const PURCASE_STATE = "RESERVATION";
  console.log(`router.query:`, router.query);

  console.log('auth', localStorage.getItem("Authorization"));
  console.log('uid', localStorage.getItem("uid"));

  

  useEffect(() => {
    if(!localStorage.getItem("Authorization") && !localStorage.getItem("uid")) return;
    const getData = async () => {
      try {
        const token = "Bearer "+localStorage.getItem("Authorization");
        const uid = localStorage.getItem("uid");
        const res = await axios.get(
          `http://api-billita.xyz/rental/ALL`,
          {
            headers: {
              Authorization: token,
              uuid: uid,
            },
          })
        const data = res.data;
        console.log(data);
        // const rentalData = data.find(
        //   (item: rentalDataType) => item.purchaseState === PURCASE_STATE
        // );
        // if (!rentalData) return;
        // setRentCarData(rentalData);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
    // const data = RentalData.find((item) => item.purchaseState === "PAID");
    // if (!data) return;
    // setRentCarData(data);
  }, []);
  return (
    <>
      <div className={style.topWrap}>
        <div className={style.greetingBinding}>
          <div className={style.greeting}>빌리타님</div>
          <div className={style.greeting}>안녕하세요!</div>
          <div className={style.bluehighlightsmfont}>마이페이지</div>
        </div>
        <div className={style.backBtn} onClick={() => setIsSideOpen(false)}>
          <Image
            src="/assets/images/icons/chevrons-down.svg"
            width="25"
            height="25"
            alt="backToMain"
          />
        </div>
      </div>

      <RentCar rentCarData={rentCarData} setIsSideOpen={setIsSideOpen} />

      <div className={style.menuWrap}>
        <ul className={style.menuUl}>
          <Link href={""}>
            <li>이용내역</li>
          </Link>
          <a href="">
            <li>스마트키</li>
          </a>
          <a href="">
            <li>결제카드 등록</li>
          </a>
          <a href="">
            <li>이벤트/쿠폰</li>
          </a>
          <a href="">
            <li>고객센터</li>
          </a>
        </ul>
      </div>

      <div className={style.bottomMenuWrap}>
        <ul className={style.blueMenu}>
          {/* <a href="">
            <li>이용상품 안내</li>
          </a> */}
          {/* <a href="">
            <li>사고접수 현황</li>
          </a> */}
          <a href="">
            <li>개인정보 처리방침</li>
          </a>
          <a href="">
            <li>About Billita</li>
          </a>
        </ul>
      </div>
    </>
  );
}

const RentCar = (props: {
  rentCarData: rentalDataType;
  setIsSideOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { rentCarData } = props;
  const handlePush = () => {
    props.setIsSideOpen(false);
    router.push(`/rental/${rentCarData.rentalId}/detail`);
  };
  const serviceStartTime = new Date(rentCarData.startDate);
  const serviceEndTime = new Date(rentCarData.endDate);

  return (
    <div className={style.grayWrapper} onClick={handlePush}>
      <div className={style.paddingWrap}>
        <SectionTitle fontSize={1}>대여 차량</SectionTitle>
        <Separator gutter={1.2} />
        <div className={style.reserveWrapper}>
          <div className={style.textWrap}>
            <div className={style.carName}>
              {rentCarData.maker} {rentCarData.carModel}
             </div>
            <div className={style.period}>
              {serviceStartTime.getMonth()}월 {serviceStartTime.getDate()}일{" "}
              {serviceStartTime.getHours()}:
              {String(serviceStartTime.getMinutes()).padStart(2, "0")} -{" "}
              {serviceEndTime.getMonth()}월 {serviceEndTime.getDate()}일{" "}
              {serviceEndTime.getHours()}:
              {String(serviceEndTime.getMinutes()).padStart(2, "0")}
            </div>
          </div>
          <div className={style.imgWrap}>
            <Image
              src={rentCarData.imageUrl}
              width="300"
              height="300"
              alt={rentCarData.carModel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
