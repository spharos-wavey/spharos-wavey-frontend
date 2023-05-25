import React from 'react'
import style from './PageLoader.module.css'
import Image from 'next/image'

export default function PageLoader(props: {text?:string}) {
  return (
    <div className={style.myLoader}>
      <div className={style.loader}>
        <Image src="/assets/images/etc/loader.svg" width={30} height={30} alt='loader'/>
      </div>
      <p>지도 정보와 현재위치에서 사용가능한 차량을<br/>불러오고 있습니다.</p>
    </div>
  )
}
