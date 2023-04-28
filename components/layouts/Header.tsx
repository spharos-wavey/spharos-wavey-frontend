import React from "react";
import { headerMenuData } from "@/datas/staticMenuDatas";
import HeaderMenuItem from "./MenuItem";
import { headerMenuType } from "@/types/headerType";
import style from "@/components/layouts/Header.module.css";

export default function Header() {
  return (
    <header className={style.headerContainer}>
      <nav>
        <ul>
          {headerMenuData.map((menuItem: headerMenuType) => {
            return <HeaderMenuItem menuItem={menuItem} key={menuItem.id} />;
          })}
        </ul>
      </nav>
    </header>
  );
}
