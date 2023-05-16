import React from "react";
import Image from "next/image";
import style from "./ModalActionToPay.module.css";

export default function ModalActionToPay(props: any) {
  return (
    <div className={style.modalWrap}>
      <div className={style.closeBtn} onClick={() => props.setNextDrawer}>
        <Image
          src="/assets/images/icons/modalCloseX.svg"
          width="20"
          height="20"
          alt="close"
        />
      </div>
      <div className={style.modalTitle}>예약결제 안내</div>
      <div className={style.greyText}>
        차량예약 및 요금결제를 진행하시겠습니까?
      </div>
      <div className={style.drawerContentWrap}>
        <div className={style.drawerContentBinding}>
          <div className={style.blueHighlight}>예약자</div>
          <div>김민지</div>
        </div>
        <div className={style.drawerContentBinding}>
          <div className={style.blueHighlight}>대여</div>
          <div>2023-05-07 15:30</div>
        </div>
        <div className={style.drawerContentBinding}>
          <div className={style.blueHighlight}>반납</div>
          <div>2023-05-07 22:00</div>
        </div>
      </div>
      <div className={style.lastLine}>
        대여시작 2시간 이내 취소 시, 대여요금+보험료의 10-25% 수수료 부과
      </div>
    </div>
  );
}
