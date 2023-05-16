import React from "react";
import style from "./ModalBookCancel.module.css";
import Image from "next/image";

export default function ModalMustRead(props: any) {
  return (
    <div className={style.modalWrap}>
      <div onClick={() => props.setDrawer(false)} className={style.closeBtn}>
        <Image
          src="/assets/images/icons/modalCloseX.svg"
          width="20"
          height="20"
          alt="close"
        />
      </div>
      <div className={style.modalTitle}>예약 전, 필수 확인 사항</div>
      <div className={style.greyText}>
        차량 이용시 예약 전 주의사항을 꼭 읽어주세요
      </div>
      <div className={style.greyText}></div>
      <div>
        <p className={style.redText}>취소수수료 안내</p>
        <div className={style.ulWrapper}>
          <ul>
            <li>수수료는 예약을 취소한 시점 기준으로 적용</li>
            <li>취소시점/대여기간에 따라 10~25% 수수료 부과</li>
            <li>실 결제금액을 기준으로 수수료가 계산됨</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
