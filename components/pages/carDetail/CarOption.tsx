import { CarFeatureType } from '@/types/carDataType';
import React, { useState } from 'react'

export default function CarOption(props: {carFeature: CarFeatureType[]}) {
  const carOptions = props.carFeature as [];
  const carFeatureArray = Object.entries(carOptions);
  return (
    <div>
      <div>옵션정보</div>
      <div>
      {carFeatureArray.map((item, index) => {
        return (
          <div key={index}>
            {item[0]} : {String(item[1])}
            <div>
              {/* <Image src 어떻게하지? */}
            </div>
          </div>
        )
      })
      }
      </div>
    </div>
  )
}
