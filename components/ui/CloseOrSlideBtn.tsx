import React, { useState } from 'react'
import style from './CloseOrSlideBtn.module.css'
import Image from 'next/image'

export default function CloseOrSlideBtn(props: {onClick?:()=>void}) {

  const [isActive, setIsActive] = useState(false);
  const handleActive = () => {
    // setIsActive(!isActive);
    if(props.onClick) props.onClick();
  };

  return (
    <div
        className={
          isActive ? `${style.slideDown} ${style.active}` : style.slideDown
        }
        onClick={handleActive}
      >
        <Image
          src="/assets/images/icons/slideDownIcon.svg"
          width={200}
          height={200}
          alt="slideDownBtn"
        />
      </div>
  )
}
