import React from "react";
import Image from "next/image";
import style from "./LogInRequiredModal.module.css";

export default function LogInRequiredModal(props: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
}) {
  const { isModalOpen, setIsModalOpen } = props;

  return (
    <div>
      <div className={style.modalOverlay}>
        <div className={style.modalContainer}>
            <div className={style.modalTitle}>
              로그인이 필요한 서비스입니다.
            </div>

          <div className={style.modalBody}>
            <div className={style.actionToOut} onClick={() => setIsModalOpen(false)}>아니요, 괜찮아요</div>
            <div className={style.actionToLogin}>로그인 하러가기</div>
          </div>

          <div className={style.logoWrap}>
              <Image src="/assets/images/common/billitaLogo.svg" alt="logo" width={40} height={40} priority/>
            </div>
        </div>
      </div>
    </div>
  );
}
