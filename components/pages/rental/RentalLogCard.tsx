import React from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import Image from 'next/image'
import style from "./RentalLogCard.module.css"
import Separator from '@/components/ui/Separator'

export default function RentalLogCard(props:{title: string}) {
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
