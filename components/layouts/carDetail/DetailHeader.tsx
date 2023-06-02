import React from "react";
import style from "./DetailHeader.module.css";
import { headerMenuType } from "@/types/headerType";
import { detailMenuData } from "@/datas/staticMenuDatas";
import MenuItem from "@/components/layouts/MenuItem";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { redirectionUrlState } from "@/state/redirectionState";

export default function DetailHeader() {
  const router = useRouter();
  const redirect = useRecoilValue(redirectionUrlState);
  const goBack = () => {
    if(redirect.redirectUrl) {
      router.push(redirect.redirectUrl)
      return
    }
    router.back()
  }
  
  return (
    <header className={style.headerContainer}>
      <nav>
        <ul>
          {detailMenuData.map((menuItem: headerMenuType) => {
            return <MenuItem menuItem={menuItem} key={menuItem.id} onClick={goBack}/>;
          })}
        </ul>
      </nav>
    </header>
  );
}
