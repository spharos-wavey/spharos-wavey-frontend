import React from "react";
import RentalLogCard from "./RentalLogCard";
import style from "./RentalLogWrapper.module.css";
import RentalLogNotExist from '@/components/pages/rental/RentalLogNotExist'

export default function RentalLogWrapper(props: {title: string, xx: boolean}) {
  return (
    <main>
      <div  className={style.wrapper}>
        {props.xx ? <RentalLogCard title={props.title}/> : <RentalLogNotExist />}
        
      </div>
    </main>
  );
}
