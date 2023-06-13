import React, { useState } from "react";
import Image from "next/image";
import style from "./CarOption.module.css";
import { CarFeatureType } from "@/types/carDataType";

export default function CarOption(props: { feature: CarFeatureType }) {
  const carOptions = props.feature;
  const carFeatureArray = Object.entries(carOptions);
  const featureIcons: any = {
    '열선시트': "/assets/images/icons/carFeatures/heatedSeat.png",
    '선루프': "/assets/images/icons/carFeatures/sunRoof.png",
    '가죽시트': "/assets/images/icons/carFeatures/leatherSheet.png",
    '스마트키': "/assets/images/icons/carFeatures/smartKey.png",
    '통풍시트': "/assets/images/icons/carFeatures/coolSeat.png",
    '내비게이션': "/assets/images/icons/carFeatures/navigation.png",
    '자동에어컨': "/assets/images/icons/carFeatures/autoAC.png",
    '후방 카메라': "/assets/images/icons/carFeatures/backCamera.png",
    '헤드램프(LED)': "/assets/images/icons/carFeatures/headLamp.png",
    '주차감지센서': "/assets/images/icons/carFeatures/parkingSensor.png",
  };

  return (
    <div>
      <div className={style.optionTitle}>주요옵션</div>
      <div className={style.optionContainer}>
        {carFeatureArray.map((item, index) => {
          const featureName = item[0];
          const isOptionActive = item[1];
          const iconPath = featureIcons[featureName];
          return (
            <ul
              key={index}
              className={
                isOptionActive
                  ? `${style.optionList}`
                  : `${style.optionList} ${style.blur}`
              }
            >
              <li>
                <div className={style.optionRow}>
                  <div className={style.optionImg}>
                    <Image
                      src={iconPath}
                      alt={featureName}
                      width="200"
                      height="200"
                    />
                  </div>
                </div>
                <div className={style.optionRow}>
                  <span className={style.optionDetail}>{item[0]}</span>
                </div>
                <span className={style.hidden}>{String(item[1])}</span>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
