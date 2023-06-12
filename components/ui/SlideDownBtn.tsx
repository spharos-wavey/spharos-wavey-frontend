import React from 'react'
import style from './SlideDownBtn.module.css'
import Image from 'next/image';

export default function SlideDownBtn(props: { isActive: boolean, handleActive: () => void }) {

  const { isActive, handleActive } = props;

  return (
    <div className={isActive ? `${style.slideDownBtn} ${style.active}` : style.slideDownBtn} onClick={handleActive}>
      <Image src="/assets/images/icons/closeBigWhite.svg" width={200} height={200} alt="slideDownBtn" />
    </div>
  )
}
