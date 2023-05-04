import React from "react";
import style from "./MapHeader.module.css";
import { mapHeaderIcon } from "@/datas/staticMenuDatas";
import MenuItem from "../MenuItem";

export default function MapHeader() {
  return (
    <div className={style.header}>
      <nav>
        <ul>
          <MenuItem
            menuItem={mapHeaderIcon[0]}
            key={mapHeaderIcon[0].id}
            width="1rem"
          />
          <MenuItem
            menuItem={mapHeaderIcon[1]}
            key={mapHeaderIcon[1].id}
            width="5rem"
          />
          <MenuItem
            menuItem={mapHeaderIcon[2]}
            key={mapHeaderIcon[2].id}
            width="1.5rem"
          />
        </ul>
      </nav>
    </div>
  );
}
