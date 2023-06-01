import React, { useEffect, useState } from "react";
import { headerMenuData } from "@/datas/staticMenuDatas";
import style from "@/components/layouts/Header.module.css";
import MenuItem from "./MenuItem";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import ModalSideBar from "../modals/ModalSideBar";
import { useRecoilState } from "recoil";
import { authState } from "@/state/authState";

export default function Header() {

  const [auth, setAuth] = useRecoilState(authState)
  console.log(auth);
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);

  const toggleMenu = (event: any) => {
    setIsSideOpen(!isSideOpen);
  }

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
