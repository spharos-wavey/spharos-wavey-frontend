import React, { useEffect, useState } from "react";
import { headerMenuData } from "@/datas/staticMenuDatas";
import style from "@/components/layouts/Header.module.css";
import MenuItem from "./MenuItem";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ModalSideBar from "../modals/ModalSideBar";
import Image from "next/image";

export default function Header() {
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);

  const toggleMenu = (event: any) => {
    setIsSideOpen(!isSideOpen);
  };

  return (
    <>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        from="left"
        width="100%"
        isOpen={isSideOpen}
        hideHeader={true}
        onRequestClose={() => {
          setIsSideOpen(false);
        }}
      >
        <>
          <ModalSideBar setIsSideOpen={setIsSideOpen} isSideOpen={isSideOpen} />
        </>
      </SlidingPane>
      <header className={style.headerContainer}>
        <nav>
          <ul>
            <MenuItem
              menuItem={headerMenuData[0]}
              key={headerMenuData[0].id}
              onClick={toggleMenu}
            />
          </ul>
        </nav>
        <div className={style.headerLogo}>
          <h1>Billita</h1>
          <Image
            src="/assets/images/common/billitaLogo.svg"
            width={129}
            height={65}
            alt="Welcome to Billita"
            priority
          />
        </div>
      </header>
    </>
  );
}
