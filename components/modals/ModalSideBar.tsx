import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import style from "./ModalSideBar.module.css";
import SectionTitle from "../ui/SectionTitle";
import Separator from "../ui/Separator";

type Props = {
  onClose: () => void;
};

export default function ModalSideBar(props: any) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    props.onClose();
  };

  
  

  return (
    <div className={isOpen ? `${style.wrap} ${style.open}` :  `${style.wrap} ${style.close}`} >
      <div className={style.topWrap}>
        <div className={style.greetingBinding}>
          <div className={style.greeting}>빌리타님</div>
          <div className={style.greeting}>안녕하세요!</div>
        </div>
        <div className={style.backBtn} onClick={handleClose}>
          <Image
            src="/assets/images/icons/chevrons-down.svg"
            width="25"
            height="25"
            alt="backToMain"
          />
        </div>
      </div>
      <div className={style.bluehighlightsmfont}>마이페이지</div>

      <div className={style.grayWrapper}>
        <div className={style.paddingWrap}>
          <SectionTitle fontSize={1}>대여 차량</SectionTitle>
          <Separator gutter={2} />
          <div className={style.reserveWrapper}>
            <div className={style.textWrap}>
              <div className={style.carName}>Tesla Model 3</div>
              <div className={style.period}>
                4월 19일 21:00 - 4월 20일 16:00
              </div>
            </div>
            <div className={style.imgWrap}>
              <Image
                src="/assets/images/car/tesla-x.png"
                width="100"
                height="70"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className={style.menuWrap}>
        <ul className={style.menuUl}>
          <a href="">
            <li>이용내역</li>
          </a>
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
          <a href="">
            <li>이용상품 안내</li>
          </a>
          <a href="">
            <li>사고접수 현황</li>
          </a>
          <a href="">
            <li>이용상품 안내</li>
          </a>
          <a href="">
            <li>이용상품 안내</li>
          </a>
        </ul>
      </div>
    </div>
  );
}
