import React, { useState } from "react";
import { headerMenuData } from "@/datas/staticMenuDatas";
import style from "@/components/layouts/Header.module.css";
import MenuItem from "./MenuItem";
import ModalSideBar from "../modals/ModalSideBar";


export default function Header() {
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
