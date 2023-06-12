import React, { useEffect } from 'react'
import Image from 'next/image'
import style from './ScrollToTop.module.css'

export default function ScrollToTop() {


  const [isScroll, setIsScroll] = React.useState<boolean>(false);

  const handleScrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  useEffect(() => {
    // 스크롤이 1000이상 내려가면 버튼이 나타나고, 1000이하로 올라가면 버튼이 사라짐
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <div className={isScroll ? `${style.scrollToTop} ${style.open}` : `${style.scrollToTop} ${style.close}`} onClick={handleScrollToTop}>
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
