import React from 'react'
import style from './PageLoader.module.css'
import Image from 'next/image'

export default function DataLoader() {
  return (
    <div className={style.loader}>
      <Image src="/assets/images/etc/loader.svg" width={30} height={30} alt='loader'/>
    </div>
  )
}
