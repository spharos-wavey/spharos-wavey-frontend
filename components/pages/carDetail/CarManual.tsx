import React from "react";
import Image from "next/image";
import style from "./CarManual.module.css";

export default function CarManual(props: { guide: string, carName:string }) {
  return (
    <div>
      <div className={style.title}>선택하신 <span>{props.carName}</span>의</div>
      <div className={style.subtitle}>이용방법을 참고해보세요.</div>
      <div className={style.prepareNotice}>- 이미지는 업데이트되거나 준비중일 수 있습니다. -</div>
      <div className={style.imgbox}>
        <Image
          src={props.guide}
          width={640}
          height={2000}
          alt={"guide"}
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC"
        />
      </div>
    </div>
  );
}
