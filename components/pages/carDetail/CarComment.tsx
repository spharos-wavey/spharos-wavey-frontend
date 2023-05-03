import React from "react";
import style from "./CarComment.module.css";
import Image from "next/image";
import Separator from "@/components/ui/Separator";

interface commentType {
  imgUrl: string;
  name: string;
  date: string;
  contents: string;
}

export default function CarComment({
  imgUrl,
  name,
  date,
  contents,
}: commentType) {
  return (
    <div className={style.comment}>
      {/* 프로필이미지, 작성자, 작성시간 */}
      <div className={style.profile}>
        <div className={style.profileImg}>
          <Image src={imgUrl} width={200} height={200} alt={"profile"} />
        </div>
        <div className={style.profileInfo}>
          <div>{name}</div>
          <Separator gutter={0.1} padding={true} />
          <div style={{ opacity: "0.6" }}>{date}</div>
        </div>
      </div>
      <Separator gutter={0.3} padding={true} />
      <div className={style.contents}>{contents}</div>
    </div>
  );
}
