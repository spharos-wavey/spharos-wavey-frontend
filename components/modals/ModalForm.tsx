import React from "react";
import style from "./ModalForm.module.css";

export default function ModalForm(props: {
  title: string;
  userName?: string;
  startDate?: string;
  endDate?: string;
}) {
  
  const startDate = props.startDate ? new Date(props.startDate) : null;
  const endDate = props.endDate ? new Date(props.endDate) : null;
  console.log(startDate, "startDate");

  return (
    <div className={style.modalWrap}>
      <div className={style.modalTitle}>{props.title}</div>
      {props.title === "예약 전, 필수 확인 사항" && (
        <>
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
        </>
      )}
      {props.title === "예약 취소" && (
        <>
          <div className={style.greyText}>
            지금 뒤로가면 선택하신 예약정보가 저장되지 않습니다.
          </div>
          <div className={style.greyText}>계속 진행하시겠습니까?</div>
        </>
      )}
      {props.title === "대여 취소" && (
        <>
          <div className={style.greyText}>
            지금 취소하시면 수수료가 발생하지 않습니다.
          </div>
          <div className={style.greyText}>계속 진행하시겠습니까?</div>
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
        </>
      )}
      {props.title === "예약결제 안내" && (
        <>
          <div className={style.greyText}>
            차량예약 및 요금결제를 진행하시겠습니까?
          </div>
          <div className={style.drawerContentWrap}>
            <div className={style.drawerContentBinding}>
              <div className={style.blueHighlight}>예약자</div>
              <div>{props.userName}</div>
            </div>
            <div className={style.drawerContentBinding}>
              <div className={style.blueHighlight}>대여일시</div>

              <div>
                {startDate?.getFullYear()}년{" "}
                {startDate && startDate?.getMonth() + 1}월 {startDate?.getDate()}
                일{" "}
              </div>
            </div>
            <div className={style.drawerContentBinding}>
              <div className={style.blueHighlight}>반납일시</div>
              <div>
                {endDate?.getFullYear()}년 {endDate && endDate?.getMonth() + 1}
                월 {endDate?.getDate()}일{" "}
              </div>
            </div>
          </div>
          <div className={style.lastLine}>
            대여시작 2시간 이내 취소 시, 대여요금+보험료의 10-25% 수수료 부과
          </div>
        </>
      )}
      {props.title === "반납하기" && (
        <>
          <div className={style.greyText}>반납장소에 무사히 도착하셨나요?</div>
          <div className={style.greyText}>반납을 진행을 도와드리겠습니다.</div>
          <div>
            <p className={style.redText}>반납지연 수수료 안내</p>
            <div className={style.ulWrapper}>
              <ul>
                <li>수수료는 예약을 취소한 시점 기준으로 적용</li>
                <li>취소시점/대여기간에 따라 10~25% 수수료 부과</li>
                <li>실 결제금액을 기준으로 수수료가 계산됨</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
