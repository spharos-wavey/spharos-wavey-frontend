import React, { useState } from "react";
import Image from "next/image";
import { Box, Drawer } from "@mui/material";
import style from "./ReturnMandatoryTab.module.css";
import Separator from "@/components/ui/Separator";
import ModalBookCancel from "@/components/modals/ModalBookCancel";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import { staticReturnQuestionData } from "@/datas/staticReturnQuestionData";

export default function ReturnMandatoryTab() {
  const [tab, setTab] = useState(false);
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
              btnType={"button"}
              btnEvent={() => alert("action")}
              shadow={true}
            >
              버튼 바꿔주세욜
            </Button>
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
          <Image
            src="assets/images/icons/greyReturnCheck.svg"
            width="20"
            height="20"
            alt="check"
          />
          <div>네</div>
          <Image
            src="assets/images/icons/greyReturnCheck.svg"
            width="20"
            height="20"
            alt="check"
          />
          <div>아니오</div>
        </div>
        <hr className={style.hr} />
        {staticReturnQuestionData.map((q) => (
          <div className={style.qWrap} key={q.id}>
            <div className={style.lastCheck}>{q.Questionaire}</div>
            <div onClick={() => setTab(true)} className={style.yesWrap}>
              {!tab ? (
                <Image src={q.defaultIcon} width="20" height="20" alt="check" />
              ) : (
                <Image src={q.activeIcon} width="20" height="20" alt="check" />
              )}

              <div className={style.answer}>네</div>
            </div>
          </div>
        ))}

        <Separator gutter={3} />
        <hr className={style.hr} />

        <div className={style.qWrap}>
          <div className={style.lastCheck}>빌리타 이용규칙 및 패널티 안내</div>
          <div className={style.yesWrap}>
            <Image
              src="assets/images/icons/rightArrowGreyBold.svg"
              width="10"
              height="10"
              alt="check"
            />
          </div>
        </div>
      </div>

      <BottomFixedContainer>
        <Button
          btnType={"button"}
          btnEvent={() => alert("action")}
          shadow={true}
        >
          결제하기 5030원
        </Button>
      </BottomFixedContainer>
    </>
  );
}
