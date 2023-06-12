import { eventBannerType } from "@/types/eventBannerType";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { mainEventData } from "@/datas/mainEventData";
import style from "@/components/pages/main/EventBanner.module.css";
import { useRouter } from "next/router";

export default function EventBanner() {
  const [bannerData, setBannerData] = useState<eventBannerType>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // todo: banner image load for fetch
    setBannerData(mainEventData);
  }, []);
  return (
    <div
      className={
        isActive ? `${style.bannerWrap} ${style.active}` : style.bannerWrap
      }
      onClick={() => setIsActive(!isActive)}
    >
      {bannerData && (
        <>
          <div className={style.bannerContents}>
            <div className={style.bannerLeft}>
              <h3>{bannerData.carName}</h3>
              <div className={style.brandImage}>
                <Image
                  src={bannerData.carBrandImage}
                  width={200}
                  height={200}
                  alt={bannerData.carBrand}
                  priority
                />
              </div>
            </div>
            <div className={style.bannerRight}>
              <Image
                src={bannerData.carImage}
                width={426}
                height={244}
                alt={bannerData.carName}
                priority
              />
            </div>
          </div>
          <div className={style.bannerOverlay}>
            <div className={style.bannerText}>
              지금 어디론가 떠나고 싶으세요?
            </div>
            <div
              className={style.bannerButton}
              onClick={() => router.push("/map")}
            >
              내 주변의 차량 보러가기
              <div className={style.arrow}>
                <Image
                  src="/assets/images/icons/arrow-right.svg"
                  width={200}
                  height={200}
                  alt="arrow"
                  priority
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
