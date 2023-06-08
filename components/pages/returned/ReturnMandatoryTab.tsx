import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { authState } from "@/state/authState";
import { Box, Drawer } from "@mui/material";
import style from "./ReturnMandatoryTab.module.css";
import Swal from "sweetalert2";
import Separator from "@/components/ui/Separator";
import ModalForm from "@/components/modals/ModalForm";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import { staticReturnQuestionData } from "@/datas/staticReturnQuestionData";

export default function ReturnMandatoryTab() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const auth = useRecoilValue(authState);
  const TOKEN = "Bearer " + auth.token;
  const USER_UID = auth.uid;
  const RETURNED_TIME = "2023-06-08 02:00";
  const FINAL_PRICE = "10000";

  const [isYesProperlyParked, setIsYesProperlyParked] =
    useState<boolean>(false);
  const [isNoProperlyParked, setIsNoProperlyParked] = useState<boolean>(false);

  const handleYesParking = () => {
    if (!isNoProperlyParked) {
      setIsYesProperlyParked(!isYesProperlyParked);
    }
  };

  const handleNoParking = () => {
    if (!isYesProperlyParked) {
      setIsNoProperlyParked(!isNoProperlyParked);
    }
  };

  useEffect(() => {
    if (isNoProperlyParked) {
      Swal.fire({
        text: "고객센터로 문의주시기 바랍니다",
        icon: "error",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        footer: `<a href="">문의하기</a>`,
      });
    }
  }, [!isNoProperlyParked]);

  const [questionActive, setQuestionActive] = useState<boolean[]>(
    new Array(staticReturnQuestionData.length).fill(false)
  );

  useEffect(() => {
    const allQuestionsClicked = questionActive.every((isActive) => isActive);
    if (allQuestionsClicked) {
      handleReturnConfirmed();
    }
  }, [questionActive]);

  const handleActionAPI = async () => {
      try {
        const response = await fetch(
          `${API_URL}/rental/${router.query.rentId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: TOKEN,
              uid: USER_UID,
            },
            body: JSON.stringify({
              returnTime: RETURNED_TIME,
              finalPrice: FINAL_PRICE,
            }),
          }
        );
        if (response.ok) {
          handleSwalReturnConfirm();
          // router.push("/");
        } else {
          throw new Error("반납요청 실패");
        }
      } catch (error) {
        console.log(error);
      }
    
  };

  const handleAnswerAllPlz = () => {
    Swal.fire({
      text: "모든 질문에 답변해주세요",
      icon: "error",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const handleSwalReturnConfirm = () => {
    Swal.fire({
      text: "반납이 완료되었습니다",
      icon: "success",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const handleReturnConfirmed = () => {
    if(!isYesProperlyParked || questionActive.includes(false)){
      handleAnswerAllPlz()}
      else{
      handleActionAPI();
      }
  };

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
        <div className={style.initialQ}>
          센텀 리더스마크 주차장B에 반납하셨나요?
        </div>
        <div className={style.initialAnswerWrap}>
          <div
            className={style.initialAnswer}
            onClick={() => handleYesParking()}
          >
            {!isYesProperlyParked ? (
              <Image
                src="/assets/images/icons/greyReturnCheck.svg"
                width="20"
                height="20"
                alt="check"
              />
            ) : (
              <Image
                src="/assets/images/icons/activeCheck.svg"
                width="20"
                height="20"
                alt="checked"
              />
            )}
            <div onClick={() => handleYesParking()}>네</div>
          </div>
          <div
            className={style.initialAnswer}
            onClick={() => handleNoParking()}
          >
            {!isNoProperlyParked ? (
              <Image
                src="/assets/images/icons/greyReturnCheck.svg"
                width="20"
                height="20"
                alt="check"
              />
            ) : (
              <Image
                src="/assets/images/icons/activeCheck.svg"
                width="20"
                height="20"
                alt="check"
              />
            )}
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
              <div className={style.checkWrap}>
                {!questionActive[index] ? (
                  <Image
                    src={q.defaultIcon}
                    width="20"
                    height="20"
                    alt="check"
                  />
                ) : (
                  <Image
                    src={q.activeIcon}
                    width="18"
                    height="18"
                    alt="checked"
                  />
                )}
              </div>
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
              src="/assets/images/icons/rightArrowGreyBold.svg"
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
          btnEvent={() => handleReturnConfirmed()}
          shadow={true}
        >
          반납하기
        </Button>
      </BottomFixedContainer>
    </>
  );
}
