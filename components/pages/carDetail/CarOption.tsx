import React, { useState } from "react";
import Image from "next/image";
import style from "./CarOption.module.css";
import { CarFeatureType } from "@/types/carDataType";

export interface iconType {
  id: number,
  name: string,
  icon: string,
}

// '열선시트': "/assets/images/icons/carFeatures/heatedSeat.png",
//     '선루프': "/assets/images/icons/carFeatures/sunRoof.png",
//     '가죽시트': "/assets/images/icons/carFeatures/leatherSheet.png",
//     '스마트키': "/assets/images/icons/carFeatures/smartKey.png",
//     '통풍시트': "/assets/images/icons/carFeatures/coolSeat.png",
//     '내비게이션': "/assets/images/icons/carFeatures/navigation.png",
//     '자동에어컨': "/assets/images/icons/carFeatures/autoAC.png",
//     '후방 카메라': "/assets/images/icons/carFeatures/backCamera.png",
//     '헤드램프(LED)': "/assets/images/icons/carFeatures/headLamp.png",
//     '주차감지센서': "/assets/images/icons/carFeatures/parkingSensor.png",

export default function CarOption(props: { feature: CarFeatureType }) {
  const carOptions = props.feature;
  const carFeatureArray = Object.entries(carOptions);
  const featureIcons:iconType[] = [ 
    {
      id: 1,
      name: '열선시트',
      icon: "/assets/images/icons/carFeatures/heatedSeat.png",
    }, 
    {
      id: 2,
      name: '선루프',
      icon: "/assets/images/icons/carFeatures/sunRoof.png",
    },
    {
      id: 3,
      name: '가죽시트',
      icon: "/assets/images/icons/carFeatures/leatherSheet.png",
    },
    {
      id: 4,
      name: '스마트키',
      icon: "/assets/images/icons/carFeatures/smartKey.png",
    },
    {
      id: 5,
      name: '통풍시트',
      icon: "/assets/images/icons/carFeatures/coolSeat.png",
    },
    {
      id: 6,
      name: '내비게이션',
      icon: "/assets/images/icons/carFeatures/navigation.png",
    },
    {
      id: 7,
      name: '자동에어컨',
      icon: "/assets/images/icons/carFeatures/autoAC.png",
    },
    {
      id: 8,
      name: '후방 카메라',
      icon: "/assets/images/icons/carFeatures/backCamera.png",
    },
    {
      id: 9,
      name: '헤드램프(LED)',
      icon: "/assets/images/icons/carFeatures/headLamp.png",
    },
    {
      id: 10,
      name: '주차감지센서',
      icon: "/assets/images/icons/carFeatures/parkingSensor.png",
    },
];

  return (
    <div>
      <div className={style.optionTitle}>주요옵션</div>
      <div className={style.optionContainer}>
        <ul>
          {carFeatureArray.map((feature, index) => {
            return (
              <li key={index}>
                <div className={feature[0] === featureIcons[index].name && feature[1] ? `${style.optionItem} ${style.active}` : style.optionItem}>
                  <div className={style.optionImg}>
                    <Image
                      src={featureIcons[index].icon}
                      width={200}
                      height={200}
                      alt="optionImg"
                    />
                  </div>
                  <div className={style.optionName}>{featureIcons[0].name}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
