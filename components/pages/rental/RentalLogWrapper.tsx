import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./RentalLogWrapper.module.css";
import RentalLogCard from "./RentalLogCard";
import { RentalDataType } from "@/types/rentalDataType";

export default function RentalLogWrapper(props: {
  title: string;
  isLogin: boolean;
}) {
  const [serviceHistory, setServiceHistory] = useState<RentalDataType[]>(
    [] as RentalDataType[]
  );
  const [userName, setUserName] = useState<string>("");
  const PURCHASE_STATE = "ALL";


  useEffect(() => {
    if (!localStorage.getItem("Authorization") && !localStorage.getItem("uid"))
      return;
    const getData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("Authorization");
        const uid = localStorage.getItem("uid");
        const res = await axios.get(`https://api-billita.xyz/rental/${PURCHASE_STATE}`, {
          headers: {
            Authorization: token,
            uuid: uid,
          },
        });
        
        const data = res.data;
        setServiceHistory(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  
  const rentCarDataLatest = serviceHistory[0];
  console.log(serviceHistory);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const nickName = localStorage.getItem("nickName");
      if (nickName !== undefined && typeof nickName === "string") {
        setUserName(nickName);
      } else {
        setUserName("빌리타");
      }
      console.log(userName);
    }
  }, []);
  return (
    <div className={style.wrapper}>
     <RentalLogCard title={props.title} />
    </div>
  );
}
