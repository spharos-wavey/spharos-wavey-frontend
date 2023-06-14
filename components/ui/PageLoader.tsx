import React from 'react'
import style from './PageLoader.module.css'
import Image from 'next/image'
import Logo from './Logo'

export default function PageLoader(props: {text?:string}) {
  return (
    <div className={style.myLoader}>
      <Logo />
      <p className={style.text}>{props.text ? props.text : 'Loading...'}</p>
      <div className={style.loader}>
        <Image src="/assets/images/etc/loader.svg" width={30} height={30} alt='loader'/>
      </div>
    </div>
  )
}
