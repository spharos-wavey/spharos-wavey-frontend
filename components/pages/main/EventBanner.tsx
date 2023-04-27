import { eventBannerType } from "@/types/eventBannerType";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { mainEventData } from "@/datas/mainEventData";
import style from "@/components/pages/main/EventBanner.module.css";

export default function EventBanner() {
  const [bannerData, setBannerData] = useState<eventBannerType>();
  const [isActive, setIsActive] = useState<boolean>(false);

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
              지금 당장 확 마 빌리 타 뿌까?
            </div>
            <div className={style.bannerButton}>예약하기</div>
          </div>
        </>
      )}
    </div>
  );
}
