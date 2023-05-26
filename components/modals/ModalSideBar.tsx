import * as React from "react";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import style from "./ModalSideBar.module.css";
import SectionTitle from "../ui/SectionTitle";
import Separator from "../ui/Separator";
import { useRouter } from "next/router";
import {
  MyRentalCarType,
  IsUserRentalNowDataType,
} from "@/types/rentalDataType";
import axios from "axios";
import LogInRequiredModal from "./LogInRequiredModal";

export default function ModalSideBar(props: {
  setIsSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSideOpen: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { isSideOpen, setIsSideOpen } = props;
  const [rentCarData, setRentCarData] = useState<MyRentalCarType[]>(
    [] as MyRentalCarType[]
  );
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const PURCASE_STATE = "RESERVATION";
  console.log(`router.query:`, router.query);

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("uid");
    localStorage.removeItem("nickName");
    sessionStorage.removeItem("carDetail");
    setIsSideOpen(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("Authorization") && !localStorage.getItem("uid"))
      return;
    const getData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("Authorization");
        const uid = localStorage.getItem("uid");
        const res = await axios.get(
          `https://api-billita.xyz/rental/${PURCASE_STATE}`,
          {
            headers: {
              Authorization: token,
              uid: uid,
            },
          }
        );
        const data = res.data;
        setRentCarData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const nickName = localStorage.getItem("nickName");
      if (nickName !== undefined && typeof nickName === "string") {
        setUserName(nickName);
      } else {
        setUserName("빌리타");
      }
      console.log(userName);
    }
  }, []);

  const actionToHistory = () => {
    router.push("/rentHistory");
  };
  const popModal = () => {
    setIsSideOpen(false);
    setIsModalOpen(true);
    return;
  };
  return (
    <>
      {/* <LogInRequiredModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isLogin={isLogin}
      /> */}

      <div className={style.topWrap}>
        <div className={style.greetingBinding}>
          <div className={style.greeting}>{userName}님</div>
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

      {rentCarData.length > 0 ? (
        <RentCar rentCarData={rentCarData[0]} setIsSideOpen={setIsSideOpen} />
      ) : (
        <RentCarNonExist />
      )}

      <div className={style.menuWrap}>
        <ul className={style.menuUl}>
          <li onClick={() => actionToHistory()}>이용내역</li>
          <li onClick={() => popModal()}>스마트키</li>
          <li>결제카드 등록</li>
          <li>이벤트/쿠폰</li>
          <li onClick={handleLogout}>로그아웃</li>
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
          <li>개인정보 처리방침</li>
          <li>About Billita</li>
        </ul>
      </div>
    </>
  );
}

const RentCarNonExist = () => {
  return (
    <div className={style.grayWrapper}>
      <div className={style.nonRentNotice}>
        <SectionTitle fontSize={0.8}>
          현재 대여중인 차량이 없습니다.
        </SectionTitle>
      </div>
    </div>
  );
};

const RentCar = (props: {
  rentCarData: MyRentalCarType;
  setIsSideOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const { rentCarData } = props;
  const [summaryData, setSummaryData] = useState<IsUserRentalNowDataType>(
    {} as IsUserRentalNowDataType
  );

  useEffect(() => {
    const getCurrentRentKeyData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("Authorization");
        const uid = localStorage.getItem("uid");
        const res = await axios.get(
          `https://api-billita.xyz/booklist/summary/${rentCarData.vehicleId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = res.data;
        setSummaryData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentRentKeyData();
  }, []);

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
              {summaryData?.brandName} {summaryData?.carName}
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
              src={summaryData.imageUrl}
              width="300"
              height="300"
              alt={summaryData?.carName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
