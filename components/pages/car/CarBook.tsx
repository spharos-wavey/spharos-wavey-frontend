import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import style from "./CarBook.module.css";
import { CarFrameDataType, carDataType } from "@/types/carDataType";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ModalForm from "@/components/modals/ModalForm";
import Separator from "@/components/ui/Separator";
import Button from "@/components/ui/Button";
import { authState } from "@/state/authState";
import PaymentReady from "./PaymentReady";
import { useRecoilValue } from "recoil";
import DataLoader from "@/components/ui/DataLoader";
import ProgressBar from "@/components/ui/ProgressBar";

export default function CarBook(props: { carData: carDataType }) {
  const router = useRouter();
  const [drawer, setDrawer] = useState<boolean>(false);
  const [nextDrawer, setNextDrawer] = useState<boolean>(false);
  const [bookId, setBookId] = useState<number>(0);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const auth = useRecoilValue(authState);
  const [serviceStartTime, setServiceStartTime] = useState<Date>();
  const [serviceEndTime, setServiceEndTime] = useState<Date>();
  const [timeDiff, setTimeDiff] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [carData, setCarData] = useState<carDataType>();
  const [frameInfo, setFrameInfo] = useState<CarFrameDataType>();
  const [fare, setFare] = useState<number>(0);
  const [isPaymentReady, setIsPaymentReady] = useState<boolean>(false);
  const [requestBody, setRequestBody] = useState<any>();

  useEffect(() => {
    console.log(props.carData)
    if (!typeof window !== undefined) {
      const startTime = new Date(sessionStorage.getItem("startTime") as string)
      const endTime = new Date(sessionStorage.getItem("endTime") as string)
      console.log(startTime.getTime(), endTime.getTime())
      const timeDiff = Math.abs(
        endTime.getTime() - startTime.getTime()
      );
      console.log(timeDiff)
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      console.log(days, hours, minutes);
      setTimeDiff(timeDiff);
      setServiceStartTime(startTime);
      setServiceEndTime(endTime);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      const carData = props.carData;
      const frameInfo = props.carData?.frameInfo;
      const fare = timeDiff/3600000 * (carData.frameInfo.defaultPrice/24) + carData.frameInfo.defaultPrice;
      console.log(carData.frameInfo.distancePrice);
      console.log(fare);
      setCarData(carData);
      setFrameInfo(frameInfo);
      setFare(fare);
      setRequestBody({
        vehicleId: router.query.cid,
        startDate: startTime,
        endDate: endTime,
      });
    }
  }, [props.carData]);

  const handleModal = () => {
    setDrawer(true);
    setNextDrawer(false);
  };
 
  const handleClose = () => {
      setDrawer(false);
      setNextDrawer(false);
  };

  const handleOpen = () => {
    if(nextDrawer) {
      setDrawer(false);
      setNextDrawer(false);
      setIsPaymentReady(true);
      return;
    }
    if(drawer) {
      setDrawer(false);
      setNextDrawer(true);
      return;
    }
    setDrawer(true);
    setNextDrawer(false);
  };

  useEffect(() => {
    if(!requestBody) return;
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
  }, [requestBody]);

  return (
    <>
      {isPaymentReady && carData && (
        <PaymentReady
          carData={carData}
          isOpen={isPaymentReady}
          setIsOpen={setIsPaymentReady}
          bookIdData={bookId}
        />
      )}

      <div onClick={handleClose} className={ drawer ? `${style.closeBtn}` : nextDrawer ? `${style.closeBtn}` : `${style.closeBtn} ${style.close}`}>
        <Image
          src="/assets/images/icons/modalCloseX.svg"
          width="20"
          height="20"
          alt="close"
        />
      </div>
      
      <Drawer
        open={drawer || nextDrawer}
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
        <Box position='relative' width="100%" height="370px">
          <ModalForm title={drawer ? "예약 전, 필수 확인 사항" : "예약결제 안내"}
            userName={auth.nickName}
            startDate={serviceStartTime}
            endDate={serviceEndTime}
          />
          <BottomFixedContainer justifyContent="center">
            <Button
              btnType={"button"}
              btnEvent={handleOpen}
              shadow={true}
              color={"var(--billita-blueHighlight)"}
              border="1px solid var(--billita-blueHighlight)"
              fontWeight="bold"
              backgroundColor="var(--billita-white)"
            >
              {drawer ? '잘 알겠어요, 예약할게요' : '네, 진행할게요'}
            </Button>
          </BottomFixedContainer>
        </Box>
      </Drawer>
      {frameInfo && carData && (
        <div className={style.topWrap}>
          <div className={style.carImage}>
            <Image
              src={frameInfo?.image}
              width={345}
              height={200}
              alt={frameInfo?.carName}
              priority={true}
              // loader={<DataLoader />}
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
            <ProgressBar value={carData.charge} isIcon={false} width={'60px'}/>
            <div className={style.charge}>{carData.charge}%</div>
          </div>
        </div>
      )}

      <div className={style.middleWrap}>

        <div className={style.subtitle}>대여시간</div>
        <div className={style.subWrap}>
          <div className={style.content}>
            {serviceStartTime && serviceStartTime?.getMonth() + 1}월 {serviceStartTime && serviceStartTime?.getDate()}일{" "}
            {serviceStartTime && serviceStartTime?.getHours()}:
            {String(serviceStartTime && serviceStartTime?.getMinutes()).padStart(2, "0")}{" "}
            <span>- </span>
            {serviceEndTime && serviceEndTime?.getMonth() + 1}월 {serviceEndTime && serviceEndTime?.getDate()}일{" "}
            {serviceEndTime && serviceEndTime?.getHours()}:
            {String(serviceEndTime && serviceEndTime?.getMinutes()).padStart(2, "0")}{" "}
          </div>
          <div className={style.resultTxt}>{`${days}일 ${hours}시간 ${minutes}분`}</div>
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

        <Separator gutter={1.8} />

       
        <div className={style.subtitle}>주행요금</div>
        <div className={style.subWrap}>
        <div className={style.content}>{frameInfo?.distancePrice}/km</div>
        <div className={style.resultTxt}>
          {0}원
        </div>
        </div>
        <div className={style.description}>
          *주행요금은 반납시 대여시간 초과에 따라 별도로 청구됩니다.
        </div>

        <Separator gutter={1.5} />
        {frameInfo && (
          <>
            <div className={style.subtitle}>결제정보</div>
            <div className={style.subWrap}>
              <div className={style.content}>대여요금</div>
              <div className={style.resultTxt}>
                {(fare).toLocaleString("kr-KO")}원
              </div>
            </div>
          </>
        )}

        <Separator gutter={1.5} />

        <div className={style.subtitle}>결제수단</div>
        {frameInfo && (
          <div className={style.subWrap}>
            <div className={style.kakaopay}>카카오페이</div>
            <div className={style.resultTxt}>
              {fare.toLocaleString("kr-KO")}원
            </div>
          </div>
        )}

        <Separator gutter={7} />
      
      </div>

      <BottomFixedContainer justifyContent="center">
        <Button btnType={"button"} btnEvent={() => handleModal()} shadow={true}>
          결제하기 {fare.toLocaleString("kr-KO")}원
        </Button>
      </BottomFixedContainer>
    </>
  );
}
