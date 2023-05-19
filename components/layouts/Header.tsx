import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { headerMenuData } from "@/datas/staticMenuDatas";
import style from "@/components/layouts/Header.module.css";
import MenuItem from "./MenuItem";
import { useRouter } from "next/router";
import axios from "axios";
import { carDataType } from "@/types/carDataType";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Image from "next/image";
import SectionTitle from "../ui/SectionTitle";
import Separator from "../ui/Separator";
import ModalSideBar from "../modals/ModalSideBar";

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


  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);
  // console.log("isOpen", isSideOpen);

  const toggleMenu = (event: any) => {
    // event.stopPropagation();
    setIsSideOpen(!isSideOpen);
  }

  const handleClose = () => setIsSideOpen(false);

  return (
    <>
    <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        from ='left'
        width='100%'
        isOpen={isSideOpen}
        hideHeader={true}
        onRequestClose={() => {
          setIsSideOpen(false);
        }}
      >
        <>
        <ModalSideBar setIsSideOpen={setIsSideOpen} isSideOpen={isSideOpen}/>
        </>
      </SlidingPane>
    <header className={style.headerContainer}>
      <nav>
        <ul>
          <MenuItem menuItem={headerMenuData[0]} key={headerMenuData[0].id} onClick={toggleMenu}/>
          <MenuItem menuItem={headerMenuData[1]} key={headerMenuData[1].id} />
        </ul>
      </nav>
    </header>
    </>
  );
}
