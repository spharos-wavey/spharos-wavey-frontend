import React, { useEffect, useState } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import Image from 'next/image'
import style from "./RentalLogCard.module.css"
import Separator from '@/components/ui/Separator'
import { MyRentalCarType } from '@/types/rentalDataType'
import axios from 'axios'

export default function RentalLogCard(props:{title: string}) {
  const [currentRentData, setCurrentRentData] = useState<MyRentalCarType[]>()
  console.log()

  // useEffect(() => {
  //   const getCurrentRentKeyData = async () => {
  //     try {
  //       const token = "Bearer " + localStorage.getItem("Authorization");
  //       const uid = localStorage.getItem("uid");
  //       const res = await axios.get(
  //         `https://api-billita.xyz/booklist/summary/${rentCarData.vehicleId}`,
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       const data = res.data;
  //       setCurrentRentData(data);
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getCurrentRentKeyData();
  // }, []); 
  // console.log(currentRentData);

  return (
    <div>
      <SectionTitle fontSize={1}>{props.title}</SectionTitle>
      <Separator gutter={2} />
      <div className={style.wrapper}>
        <div className={style.textWrap}>
          <div className={style.carName}>Tesla Model 3</div>
          <div className={style.period}>4월 19일 21:00 - 4월 20일 16:00</div>
        </div>
        <div className={style.imgWrap}>
          <Image src="/assets/images/car/tesla-x.png" width="100" height="70"alt=""/>
        </div>
      </div>

      <hr className={style.hr}/>
    </div>
  ) 
}
