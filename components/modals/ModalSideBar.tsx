import * as React from "react";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/state/authState";
import { userRentalState } from "@/state/userRentalState";
import Image from "next/image";
import style from "./ModalSideBar.module.css";
import axios from "axios";
import SectionTitle from "../ui/SectionTitle";
import { useRouter } from "next/router";
import { MyRentalCarType } from "@/types/rentalDataType";
import Swal from "sweetalert2";
import RentCar from "../ui/RentCar";

export default function ModalSideBar(props: {
  setIsSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSideOpen: boolean;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const auth = useRecoilValue(authState);
  const TOKEN = "Bearer " + auth.token;
  const canUserBook = useRecoilValue(userRentalState);

  const { isSideOpen, setIsSideOpen } = props;
  const [authValue, setAuthValue] = useRecoilState(authState);
  const [rentCarData, setRentCarData] = useState<MyRentalCarType[]>(
    [] as MyRentalCarType[]
  );
  const router = useRouter();
  const PURCASE_STATE = "RESERVATION";

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsSideOpen(false);
    setAuthValue({
      auth: false,
      token: "",
      uid: "",
      nickName: "",
      email: "",
      profileImageUrl: "",
    });
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
          const res = await axios.get(`${API_URL}/rental/${PURCASE_STATE}`, {
            headers: {
              Authorization: TOKEN,
              uid: auth.uid,
            },
          });
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
    setIsSideOpen(false);
    !auth.auth
      ? Swal.fire({
          text: "로그인이 필요한 서비스입니다.",
          icon: "warning",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
        })
      : router.push("/rental/history");
  };

  const handleSmartKey = () => {
    if (!canUserBook.canUserBook) {
      router.push(`/rental/${rentCarData[0].rentalId}`);
    } else {
      setIsSideOpen(false);
      Swal.fire({
        text: "대여 후 이용 가능한 서비스 입니다.",
        icon: "info",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
      });
    }
  };

  return (
    <>
      <div className={style.topWrap}>
        <div className={style.greetingBinding}>
          <div className={style.greeting}>
            {auth.nickName ? auth.nickName : "빌리타"}님
          </div>
          <div className={style.greeting}>안녕하세요!</div>
          {!auth.auth ? (
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
          {auth.auth ? (
            <>
              <li onClick={() => actionToHistory()}>이용내역</li>
              <li onClick={() => handleSmartKey()}>스마트키</li>
              <li>적립금 정책</li>
            </>
          ) : (
            <></>
          )}
          {auth.auth ? <li onClick={handleLogout}>로그아웃</li> : <></>}
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
  const auth = useRecoilValue(authState);
  return (
    <div className={style.grayWrapper}>
      <div className={style.nonRentNotice}>
        {!auth.auth ? (
          <SectionTitle fontSize={0.8}>
            로그인이 필요한 서비스입니다.
          </SectionTitle>
        ) : (
          <SectionTitle fontSize={0.8}>
            현재 대여중인 차량이 없습니다.
          </SectionTitle>
        )}
      </div>
    </div>
  );
};
