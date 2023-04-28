import React from "react";
import { headerMenuData } from "@/datas/staticMenuDatas";
import { headerMenuType } from "@/types/headerType";
import style from "@/components/layouts/Header.module.css";
import MenuItem from "./MenuItem";

export default function Header() {
  return (
    <header className={style.headerContainer}>
      <nav>
        <ul>
          {headerMenuData.map((menuItem: headerMenuType) => {
            return <MenuItem menuItem={menuItem} key={menuItem.id} />;
          })}
        </ul>
      </nav>
    </header>
  );
}
