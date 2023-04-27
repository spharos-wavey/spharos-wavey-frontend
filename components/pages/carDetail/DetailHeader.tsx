import React from "react";
import style from "./DatailHeader.module.css";
import HeaderMenuItem from "@/components/layouts/HeaderMenuItem";
import { headerMenuType } from "@/types/headerType";
import { detailMenuData } from "@/datas/staticMenuDatas";

export default function DetailHeader() {
  return (
    <header className={style.headerContainer}>
      <nav>
        <ul>
          {detailMenuData.map((menuItem: headerMenuType) => {
            return <HeaderMenuItem menuItem={menuItem} key={menuItem.id} />;
          })}
        </ul>
      </nav>
    </header>
  );
}
