import React from 'react'
import style from './Discription.module.css'

export default function Discription(props: {text:string}) {
  return (
    <div className={style.description}>
      {props.text}
    </div>
  )
}
