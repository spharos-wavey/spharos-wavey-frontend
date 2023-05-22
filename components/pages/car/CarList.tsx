
import { carListType } from '@/types/carDataType'
import React from 'react'

export default function CarList(props: {data: carListType[]}) {
  
  const data = props.data;
  console.log(data)

  return (
    <div>
      {
        data.map((item:carListType) => {
          return(
            <div key={item.id}>
              {item.carBrand}
            </div>
          )
      })}
    </div>
  )
}
