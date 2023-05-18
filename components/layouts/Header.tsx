import React, { useEffect, useState } from "react";
import { headerMenuData } from "@/datas/staticMenuDatas";
import style from "@/components/layouts/Header.module.css";
import MenuItem from "./MenuItem";
import ModalSideBar from "../modals/ModalSideBar";
import { useRouter } from "next/router";
import axios from "axios";
import { carDataType } from "@/types/carDataType";



export default function Header() {
  const [carData, setCarData] = useState<carDataType>();
  const router = useRouter();
  console.log(router.query.cid);

  if (router.query.cid !== undefined) {
    const getData = async () => {
      const result = await axios.get(
        `https://api-billita.xyz/vehicle/${router.query.cid}`
      );
      console.log("data : ", result.data);
      console.log("img url : ", result.data.frameInfo.image);
      setCarData(result.data);
    };
    getData();
  }


  const [isSideOpen, setIsSideOpen] = useState(false);
  console.log("isOpen", isSideOpen);

  const toggleMenu = (event: any) => {
    // event.stopPropagation();
    setIsSideOpen(!isSideOpen);
  }

  const handleClose = () => setIsSideOpen(false);

  return (
    <>
    <header className={style.headerContainer}>
      <nav>
        <ul>
          <MenuItem menuItem={headerMenuData[0]} key={headerMenuData[0].id} onClick={toggleMenu}/>
          <MenuItem menuItem={headerMenuData[1]} key={headerMenuData[1].id} />
        </ul>
      </nav>
    </header>
    {isSideOpen && <ModalSideBar onClose={handleClose} />}
    </>
  );
}
