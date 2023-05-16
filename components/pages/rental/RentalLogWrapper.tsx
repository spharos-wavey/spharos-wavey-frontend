import React from "react";
import RentalLogCard from "./RentalLogCard";
import style from "./RentalLogWrapper.module.css";
import RentalLogNotExist from '@/components/pages/rental/RentalLogNotExist'

export default function RentalLogWrapper(props: any) {
  return (
    <main>
      <div  className={style.wrapper}>
        {props.xx ? <RentalLogCard /> : <RentalLogNotExist />}
        
      </div>
    </main>
  );
}
