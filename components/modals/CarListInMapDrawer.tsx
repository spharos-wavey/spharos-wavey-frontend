import { carInMapType } from "@/types/carDataType";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import style from "./CarListInMapDrawer.module.css";
import Image from "next/image";
import CloseOrSlideBtn from "../ui/CloseOrSlideBtn";
import ProgressBar from "../ui/ProgressBar";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { redirectionUrlState } from "@/state/redirectionState";
import ScrollToTop from "../ui/ScrollToTop";

export default function CarListInMapDrawer(props: {
  data: carInMapType[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  zoneName: string;
}) {
  const { data, isOpen, setIsOpen, zoneName } = props;

  const router = useRouter();
  const setUrlSettion = useSetRecoilState(redirectionUrlState);
  const handleDetail = (id: number) => {
    setUrlSettion({ redirectUrl: `/map` });
    router.push(`/car/${id}`);
  };

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isOpen]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false)
  };

  return (
    <>
      {/* <ScrollToTop /> */}
      {isOpen ? (
        <div
          className={style.drawerOverlay}
          onClick={handleScrollToTop}
        ></div>
      ) : null}
      <div
        className={
          isOpen
            ? `${style.drawerContainer} ${style.open}`
            : `${style.drawerContainer} ${style.close}`
        }
      >
       
        <div className={style.drawerInner}>
        <div className={style.closeBtn}>
          <CloseOrSlideBtn onClick={handleScrollToTop} />
        </div>
          <div className={style.drawerHeader}>
            <div className={style.drawerTitle}>검색된 차량 {data.length}대</div>
            <div className={style.drawerLocation}>
              <Image
                src="/assets/images/icons/map.svg"
                alt="locationicon"
                width={12}
                height={12}
              />
              {zoneName}
            </div>
          </div>
          <div className={style.drawerBody}>
            {data.map((item) => {
              return (
                <div
                  key={item.vehicleId}
                  className={style.drawerItem}
                  onClick={() => handleDetail(item.vehicleId)}
                >
                  <div className={style.drawerItemText}>
                    <div className={style.drawerItemTitle}>{item.carName}</div>
                    <ProgressBar value={item.currentCharge} />
                    <div className={style.price}>
                      {item.defaultPrice.toLocaleString("ko")}
                    </div>
                    <div className={style.distancePrice}>
                      <span>추가거리 당</span>{" "}
                      {item.distancePrice.toLocaleString("ko")}원
                    </div>
                  </div>
                  <div className={style.drawerItemImg}>
                    {item.canBook && (
                      <div className={style.badge}>예약가능</div>
                    )}
                    <div className={style.imgWrap}>
                      <Image
                        src={item.vehicleImage}
                        alt={item.carName}
                        width={100}
                        height={60}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
