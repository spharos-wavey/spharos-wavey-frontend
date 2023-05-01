import React from "react";
import style from "./DatailHeader.module.css";
import { headerMenuType } from "@/types/headerType";
import { detailMenuData } from "@/datas/staticMenuDatas";
import MenuItem from "@/components/layouts/MenuItem";

export default function DetailHeader() {
  return (
    <header className={style.headerContainer}>
      <nav>
        <ul>
          {detailMenuData.map((menuItem: headerMenuType) => {
            return <MenuItem menuItem={menuItem} key={menuItem.id} />;
          })}
        </ul>
      </nav>
    </header>
  );
}
