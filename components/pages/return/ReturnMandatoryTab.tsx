import React, { useState } from "react";
import style from "./ReturnMandatoryTab.module.css";
import Separator from "@/components/ui/Separator";
import { Box, Drawer } from "@mui/material";
import ModalBookCancel from "@/components/modals/ModalBookCancel";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";

export default function ReturnMandatoryTab() {
 
  return (
    <>
      <Drawer
        PaperProps={{
          sx: { width: 390, borderTopLeftRadius: 18, borderTopRightRadius: 18 },
        }}
        anchor="bottom"
        variant="temporary"
      >
        <Box position="relative" width="100%" height="370px">
          <ModalBookCancel />

          <BottomFixedContainer>
            <Button
              children={`버튼 바꿔주세욜`}
              btnType={"button"}
              btnEvent={() => alert("action")}
              shadow={true}
            />
          </BottomFixedContainer>
        </Box>
      </Drawer>

      <div className={style.wrapper}>
        <Separator gutter={7} />
        <div className={style.carName}>Tesla Model 3</div>
        <div className={style.initialQ}>
          센텀 리더스마크 주차장B에 반납하셨나요?
        </div>
        <div className={style.answerWrap}>
          <img src="assets/images/icons/greyReturnCheck.svg" alt="check" />
          <div>네</div>
          <img src="assets/images/icons/greyReturnCheck.svg" alt="check" />
          <div>아니오</div>
        </div>
        <hr className={style.hr} />

        <div className={style.qWrap}>
          <div className={style.lastCheck}>반납 전 마지막 확인</div>
          <div className={style.yesWrap}>
            <img src="assets/images/icons/greyReturnCheck.svg" alt="check" />
            <div className={style.answer}>네</div>
          </div>
        </div>
        <div className={style.qWrap}>
          <div className={style.lastCheck}>창문은 모두 닫았나요?</div>
          <div className={style.yesWrap}>
            <img src="assets/images/icons/greyReturnCheck.svg" alt="check" />
            <div className={style.answer}>네</div>
          </div>
        </div>
        <div className={style.qWrap}>
          <div className={style.lastCheck}>실내등은 모두 껐나요?</div>
          <div className={style.yesWrap}>
            <img src="assets/images/icons/greyReturnCheck.svg" alt="check" />
            <div className={style.answer}>네</div>
          </div>
        </div>
        <div className={style.qWrap}>
          <div className={style.lastCheck}>개인 소지품은 모두 챙겼나요?</div>
          <div className={style.yesWrap}>
            <img src="assets/images/icons/greyReturnCheck.svg" alt="check" />
            <div className={style.answer}>네</div>
          </div>
        </div>
        <div className={style.qWrap}>
          <div className={style.lastCheck}>
            이용중 발생한 쓰레기, 전부 수거했나요?
          </div>
          <div className={style.yesWrap}>
            <img src="assets/images/icons/greyReturnCheck.svg" alt="check" />
            <div className={style.answer}>네</div>
          </div>
        </div>

        <Separator gutter={3} />
        <hr className={style.hr} />

        <div className={style.qWrap}>
          <div className={style.lastCheck}>빌리타 이용규칙 및 패널티 안내</div>
          <div className={style.yesWrap}>
            <img
              src="assets/images/icons/rightArrowGreyBold.svg"
              width={10}
              alt="check"
            />
          </div>
        </div>
      </div>

      <BottomFixedContainer>
        <Button
          children={`결제하기 5030원`}
          btnType={"button"}
          btnEvent={() => alert("action")}
          shadow={true}
        />
      </BottomFixedContainer>
    </>
  );
}
