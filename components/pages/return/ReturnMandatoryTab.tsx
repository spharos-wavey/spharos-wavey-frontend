import React, { useState } from "react";
import Image from "next/image";
import { Box, Drawer } from "@mui/material";
import style from "./ReturnMandatoryTab.module.css";
import Separator from "@/components/ui/Separator";
import ModalForm from "@/components/modals/ModalForm";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import { staticReturnQuestionData } from "@/datas/staticReturnQuestionData";

export default function ReturnMandatoryTab() {
  const [isYesProperlyParked, setIsYesProperlyParked] =
    useState<boolean>(false);

  const handleYesParking = () => {
    setIsYesProperlyParked(!isYesProperlyParked);
    console.log("첫질문클릭");
  };

  const handleNoParking = () => {
    console.log("then where did you park?")
  }

  const [questionActive, setQuestionActive] = useState(
    new Array(staticReturnQuestionData.length).fill(false)
  );
  const activateQuestion = (index: number) => {
    const updatedActive = [...questionActive];
    updatedActive[index] = !updatedActive[index];
    setQuestionActive(updatedActive);
  };

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
          <ModalForm title="반납하기" />

          <BottomFixedContainer>
            <Button
              btnType={"button"}
              btnEvent={() => alert("wanna return?")}
              shadow={true}
            >
              반납하기
            </Button>
          </BottomFixedContainer>
        </Box>
      </Drawer>

      <div className={style.wrapper}>
        <Separator gutter={7} />
        <div className={style.carName}>Tesla Model 3</div>
        <div
          className={style.initialQ}
          onClick={() => handleYesParking()}
        >
          센텀 리더스마크 주차장B에 반납하셨나요?
        </div>
        <div className={style.initialAnswerWrap}>
          <div
            className={style.initialAnswer}
            onClick={() => handleYesParking()}
          >
            {!isYesProperlyParked ? (
              <Image
                src="assets/images/icons/greyReturnCheck.svg"
                width="20"
                height="20"
                alt="check"
              />
            ) : (
              <Image
                src="assets/images/icons/activeCheck.svg"
                width="20"
                height="20"
                alt="checked"
              />
            )}
            <div onClick={() => handleYesParking()}>네</div>
          </div>
          <div className={style.initialAnswer} onClick={()=> handleNoParking()}>
            <Image
              src="assets/images/icons/greyReturnCheck.svg"
              width="20"
              height="20"
              alt="check"
            />
            <div>아니오</div>
          </div>
        </div>
        <hr className={style.hr} />
        {staticReturnQuestionData.map((q, index) => (
          <div className={style.qWrap} key={q.id}>
            <div className={style.lastCheck}>{q.Questionaire}</div>
            <div
              onClick={() => activateQuestion(index)}
              className={style.yesWrap}
            >
              {!questionActive[index] ? (
                <Image src={q.defaultIcon} width="20" height="20" alt="check" />
              ) : (
                <Image
                  src={q.activeIcon}
                  width="20"
                  height="20"
                  alt="checked"
                />
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
