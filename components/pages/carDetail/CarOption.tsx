import { CarFeatureType } from "@/types/carDataType";
import React, { useState } from "react";
import style from "./CarOption.module.css";

export default function CarOption(props: { feature: CarFeatureType }) {
  const carOptions = props.feature;
  const carFeatureArray = Object.entries(carOptions);
  return (
    <div>
      <div className={style.optionTitle}>주요옵션</div>
      <div>
        {carFeatureArray.map((item, index) => {
          const isOptionActive = item[1];
          return (
            <ul key={index} className={isOptionActive? `${style.optionList}` : `${style.optionList} ${style.blur}`}>
              <li>
                <span className={style.optionDetail}>{item[0]}</span>
                <span className={style.hidden}>{String(item[1])}</span>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
