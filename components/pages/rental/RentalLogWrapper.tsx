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

  useEffect(() => {
    if (!localStorage.getItem("Authorization") && !localStorage.getItem("uid"))
      return;
    const getData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("Authorization");
        const uid = localStorage.getItem("uid");
        const res = await axios.get(`https://api-billita.xyz/rental/ALL`, {
          headers: {
            Authorization: token,
            uuid: uid,
          },
        });
        // const res = await axios.get(`https://api-billita.xyz/rental/RESERVATION`, {
        //   headers: {
        //     Authorization: token,
        //     uuid: uid,
        //   },
        // }); 여기에 MSA때문에 쪼개인 다른 api에 있는 정보를 받아와야한다.
        const data = res.data;
        setServiceHistory(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

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
