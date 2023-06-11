import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import axios from "axios";
import style from "./CarBook.module.css";
import { nowTimeState } from "@/state/nowTime";
import { carDataType } from "@/types/carDataType";
import { timeType } from "@/types/rentalDataType";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ModalForm from "@/components/modals/ModalForm";
import Separator from "@/components/ui/Separator";
import Button from "@/components/ui/Button";
import { authState } from "@/state/authState";
import PaymentReady from "./PaymentReady";

export default function CarBook(props: { carData: carDataType }) {
  const router = useRouter();
  const [drawer, setDrawer] = useState<boolean>(false);
  const [nextDrawer, setNextDrawer] = useState<boolean>(false);
  const reqTime = useRecoilValue<timeType>(nowTimeState);
  const [bookId, setBookId] = useState<number>(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const auth = useRecoilValue(authState);

  const serviceStartTime = new Date(reqTime.startTime);
  const serviceEndTime = new Date(reqTime.endTime);
  console.log(serviceStartTime, "serviceStartTime");
  console.log(reqTime.startTime, "serviceStartTime");

  const timeDiff = Math.abs(
    serviceEndTime.getTime() - serviceStartTime.getTime()
  );
  console.log(timeDiff, "timeDiff")
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const [isPaymentReady, setIsPaymentReady] = useState<boolean>(false);

  const carData = props.carData;
  const frameInfo = props.carData?.frameInfo;
  const fare = timeDiff/3600000 * frameInfo?.distancePrice;

  const handleModal = () => {
    setDrawer(true);
  };
  const handleNextModalOpen = () => {
    setDrawer(false);
    setNextDrawer(true);
  };

  const requestBody = {
    vehicleId: router.query.cid,
    startDate: reqTime.startTime,
    endDate: reqTime.endTime,
  };

  useEffect(() => {
    const postBookData = async () => {
      const TOKEN = "Bearer " + auth.token;
      try {
        const res = await axios.post(`${API_URL}/booklist`, requestBody, {
          headers: {
            Authorization: TOKEN,
          },
        });
        const data = res.data;
        setBookId(data.bookId);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    postBookData();
  }, []);

  const handlePaymentReady = () => {
    setNextDrawer(false);
    setIsPaymentReady(true);
  };

  return (
    <>
      {isPaymentReady && (
        <PaymentReady
          carData={carData}
          isOpen={isPaymentReady}
          setIsOpen={setIsPaymentReady}
          bookIdData={bookId}
        />
      )}
      {drawer && (
        <Drawer
          open={drawer}
          PaperProps={{
            sx: {
              width: "auto",
              borderTopRightRadius: 18,
              borderTopLeftRadius: 18,
            },
          }}
          anchor="bottom"
          variant="temporary"
        >
          <Box position="relative" width="100%" height="370px">
            <div onClick={() => setDrawer(false)} className={style.closeBtn}>
              <Image
                src="/assets/images/icons/modalCloseX.svg"
                width="20"
                height="20"
                alt="close"
              />
            </div>
            <ModalForm title="예약 전, 필수 확인 사항" />

            <BottomFixedContainer>
              <Button
                btnType={"button"}
                btnEvent={() => handleNextModalOpen()}
                shadow={true}
                color={"var(--billita-blueHighlight)"}
                border="1px solid var(--billita-blueHighlight)"
                fontWeight="bold"
                backgroundColor="var(--billita-white)"
              >
                잘 알겠어요, 예약할게요
              </Button>
            </BottomFixedContainer>
          </Box>
        </Drawer>
      )}
      {nextDrawer && reqTime && (
        <Drawer
          open={nextDrawer}
          PaperProps={{
            sx: {
              width: "auto",
              borderTopRightRadius: 18,
              borderTopLeftRadius: 18,
            },
          }}
          anchor="bottom"
          variant="temporary"
        >
          <Box position="relative" width="100%" height="370px">
            <div
              onClick={() => setNextDrawer(false)}
              className={style.closeBtn}
            >
              <Image
                src="/assets/images/icons/modalCloseX.svg"
                width="20"
                height="20"
                alt="close"
              />
            </div>
            {auth.nickName && (
              <ModalForm
                title="예약결제 안내"
                userName={auth.nickName}
                startDate={reqTime.startTime}
                endDate={reqTime.endTime}
              />
            )}

            <BottomFixedContainer>
              <Button
                btnType={"button"}
                btnEvent={() => handlePaymentReady()}
                shadow={true}
                color={"var(--billita-blueHighlight)"}
                border="1px solid var(--billita-blueHighlight)"
                fontWeight="bold"
                backgroundColor="var(--billita-white)"
              >
                네, 진행할게요
              </Button>
            </BottomFixedContainer>
          </Box>
        </Drawer>
      )}

      {frameInfo && (
        <div className={style.topWrap}>
          <div className={style.carImage}>
            <Image
              src={frameInfo?.image}
              width={345}
              height={200}
              alt={frameInfo?.carName}
              priority
              placeholder="blur"
              blurDataURL="/assets/images/common/billitaLogo.svg"
            />
          </div>
          <div className={style.carName}>
            {frameInfo.carBrand.brandName} {frameInfo.carName}
          </div>
          <div className={style.harrypotterBinding}>
        <div className={style.imgBinding}>
          <Image
            src="/assets/images/icons/harrypotter.svg"
            width="40"
            height="40"
            alt="harryMark"
            placeholder="empty"
          />
        </div>
            <div className={style.charge}>{carData.charge}%</div>
          </div>
        </div>
      )}

      <div className={style.middleWrap}>
        <div className={style.subWrap}>
          <div className={style.subtitle}>주행요금</div>
          <div className={style.fare}>{fare}원/km</div>
        </div>
        <div className={style.description}>
          *주행요금은 반납 후 실주행거리에 따라 별도로 청구됩니다.
        </div>

        <Separator gutter={1.8} />

        <div className={style.subtitle}>대여시간</div>
        <div className={style.subWrap}>
          <div className={style.content}>
            {serviceStartTime?.getMonth() + 1}월 {serviceStartTime?.getDate()}일{" "}
            {serviceStartTime?.getHours()}:
            {String(serviceStartTime?.getMinutes()).padStart(2, "0")}{" "}
            <span>- </span>
            {serviceEndTime?.getMonth() + 1}월 {serviceEndTime?.getDate()}일{" "}
            {serviceEndTime?.getHours()}:
            {String(serviceEndTime?.getMinutes()).padStart(2, "0")}{" "}
          </div>
          <div className={style.subtitle}>{`총 ${hours}시간 ${minutes}분`}</div>
        </div>

        <Separator gutter={1.5} />

        <div className={style.subtitle}>주차장소</div>
        <div className={style.subWrap}>
          <div className={style.content}>대여위치</div>
            {carData && (
              <div className={style.location}>{carData?.place.name}</div>
            )}
        </div>
        <div className={style.subWrap}>
          <div className={style.content}>반납위치</div>
            {carData && (
              <div className={style.location}>{carData?.place.name}</div>
            )}
        </div>

        <Separator gutter={1.5} />
        {frameInfo && (
          <>
            <div className={style.subtitle}>결제정보</div>
            <div className={style.subWrap}>
              <div className={style.content}>대여요금</div>
              <div className={style.subtitle}>
                {frameInfo.defaultPrice.toLocaleString("kr-KO")}원
              </div>
            </div>
          </>
        )}

        <Separator gutter={1.5} />

        <div className={style.subtitle}>결제수단</div>
        {frameInfo && (
          <div className={style.subWrap}>
            <div className={style.kakaopay}>카카오페이</div>
            <div className={style.subtitle}>
              {frameInfo.defaultPrice.toLocaleString("kr-KO")}원
            </div>
          </div>
        )}
      </div>

      <Separator gutter={7} />

      <BottomFixedContainer display="initial">
        <Button btnType={"button"} btnEvent={() => handleModal()} shadow={true}>
          결제하기 {frameInfo?.defaultPrice.toLocaleString("kr-KO")}원
        </Button>
      </BottomFixedContainer>
    </>
  );
}
