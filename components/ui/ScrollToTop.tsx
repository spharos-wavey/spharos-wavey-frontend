import React from 'react'
import Image from 'next/image'
import style from './ScrollToTop.module.css'

export default function ScrollToTop() {

  const handleScrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return (
    <div className={style.scrollToTop} onClick={handleScrollToTop}>
      <div
          className={style.slideDown}
        >
          <Image
            src="/assets/images/icons/slideDownIcon.svg"
            width={200}
            height={200}
            alt="slideDownBtn"
          />
      </div>
    </div>
  )
}
