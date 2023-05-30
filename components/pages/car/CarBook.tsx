import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./CarBook.module.css";
import {
  BookListDataType,
  CarFrameDataType,
  carDataType,
} from "@/types/carDataType";
import { RentalDataType, RentalFrameInfoType } from "@/types/rentalDataType";
import { useRouter } from "next/router";
import axios from "axios";
import Separator from "@/components/ui/Separator";
import Button from "@/components/ui/Button";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";

export default function CarBook() {
  const router = useRouter();
  const [carData, setCarData] = useState<carDataType>();

  useEffect(() => {
    if (router.query.cid !== undefined) {
      const getData = async () => {
        const result = await axios.get(
          `https://api-billita.xyz/vehicle/${router.query.cid}`
        );
        setCarData(result.data);
      };
      getData();
    }
  }, [router.query]);

  const frameInfo = carData?.frameInfo;
  const handleModal = () => {
    console.log("예약전 주의사항")
  }
  return (
    <>
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
            <Image
              src="/assets/images/icons/harrypotter.svg"
              width="10"
              height="10"
              alt="harryMark"
            />
            <div className={style.charge}>{carData.charge}%</div>
          </div>
        </div>
      )}

      <div className={style.middleWrap}>
        <div className={style.subWrap}>
          <div className={style.subtitle}>주행요금</div>
          <div className={style.fare}>{frameInfo?.distancePrice}원/km</div>
        </div>
        <div className={style.description}>
          *주행요금은 반납 후 실주행거리에 따라 별도로 청구됩니다.
        </div>

        <Separator gutter={1.8} />

        <div className={style.subtitle}>대여시간</div>
        {/* <div className={style.subWrap}>
          <div className={style.content}>
            {serviceStartTime?.getMonth() + 1}월 {serviceStartTime?.getDay()}일{" "}
            {serviceStartTime?.getHours()}:
            {String(serviceStartTime?.getMinutes()).padStart(2, "0")}{" "}
            <span>- </span>
            {serviceEndTime?.getMonth() + 1}월 {serviceEndTime?.getDay()}일{" "}
            {serviceEndTime?.getHours()}:
            {String(serviceEndTime?.getMinutes()).padStart(2, "0")}{" "}
          </div>
          <div className={style.subtitle}>{`총 ${hours}시간 ${minutes}분`}</div>
        </div> */}

        <Separator gutter={1.5} />

        <div className={style.subtitle}>주차장소</div>
        {/* <div className={style.subWrap}>
          <div className={style.content}>대여위치</div>
          <div className={style.arrowWrap}>
            {props.place && (
              <div className={style.location}>{props.place.name}</div>
            )}
            <div className={style.arrow}>
              <Image
                src="/assets/images/icons/rightArrowGreyBold.svg"
                width="10"
                height="10"
                alt="arrow"
              />
            </div>
          </div>
        </div>
        <div className={style.subWrap}>
          <div className={style.content}>반납위치</div>
          <div className={style.arrowWrap}>
            {props.place && (
              <div className={style.location}>{props.place.name}</div>
            )}
            <div className={style.arrow}>
              <Image
                src="/assets/images/icons/rightArrowGreyBold.svg"
                width="10"
                height="10"
                alt="arrow"
              />
            </div>
          </div>
        </div> */}

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
      <BottomFixedContainer >
        <Button
          btnType={"button"}
          btnEvent={() => handleModal()}
          shadow={true}
        >
          결제하기 {frameInfo?.defaultPrice.toLocaleString("kr-KO")}원
        </Button>
      </BottomFixedContainer>
    </>
  );
}
