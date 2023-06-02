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
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { authState } from "@/state/authState";

export default function ModalSideBar(props: {
  setIsSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSideOpen: boolean;
}) {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const auth = useRecoilValue(authState);
  const TOKEN = "Bearer " + auth.token;
  
  const { isSideOpen, setIsSideOpen } = props;
  const [rentCarData, setRentCarData] = useState<MyRentalCarType[]>(
    [] as MyRentalCarType[]
  );
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const PURCASE_STATE = "RESERVATION";

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("uid");
    localStorage.removeItem("nickName");
    sessionStorage.removeItem("carDetail");
    setIsSideOpen(false);
    Swal.fire({
      text: "로그아웃 되었습니다.",
      icon: "success",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
    });
  };

  useEffect(() => {
    
    if (auth.auth) {
      const getData = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/rental/${PURCASE_STATE}`,
            {
              headers: {
                Authorization: TOKEN,
                uid: auth.uid,
              },
            }
          );
          const data = res.data;
          setRentCarData(data);
        } catch (err) {
          console.log(err);
        }
      };
      getData();
    }
  }, [auth]);

  const actionToHistory = () => {
    router.push("/rentHistory");
  };

  return (
    <>
      <div className={style.topWrap}>
        <div className={style.greetingBinding}>
          <div className={style.greeting}>{auth.nickName ? auth.nickName : '빌리타'}님</div>
          <div className={style.greeting}>안녕하세요!</div>
          { !auth.auth ? (
            <div
              className={style.bluehighlightbtn}
              onClick={() => router.push("/login")}
            >
              로그인 하기
            </div>
          ) : (
            <div className={style.bluehighlightbtn} onClick={handleLogout}>
              로그아웃
            </div>
          )}
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
          <li>스마트키</li>
          <li>결제카드 등록</li>
          <li>이벤트/쿠폰</li>
          {userName !== "빌리타" ? (
            <li onClick={handleLogout}>로그아웃</li>
          ) : (
            <></>
          )}
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
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { rentCarData } = props;
  const [summaryData, setSummaryData] = useState<IsUserRentalNowDataType>(
    {} as IsUserRentalNowDataType
  );

  useEffect(() => {
    const getCurrentRentKeyData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("Authorization");
        const uid = auth.uid;
        const res = await axios.get(
          `${API_URL}/booklist/summary/${rentCarData.vehicleId}`,
          {
            headers: {
              Authorization: token,
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
              alt={summaryData?.carName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
