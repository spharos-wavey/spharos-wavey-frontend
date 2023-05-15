import React from "react";
import RentalLogCard from "./RentalLogCard";
import style from "./RentalLogWrapper.module.css";
import RentalLogNotExist from '@/components/pages/rental/RentalLogNotExist'

export default function RentalLogWrapper() {
  return (
    <main>
      <div  className={style.wrapper}>
        {/* <RentalLogCard /> */}
        <RentalLogNotExist />
      </div>
    </main>
  );
}
