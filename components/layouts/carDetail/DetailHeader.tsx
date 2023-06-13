import React from "react";
import style from "./DetailHeader.module.css";
import { headerMenuType } from "@/types/headerType";
import { detailMenuData } from "@/datas/staticMenuDatas";
import MenuItem from "@/components/layouts/MenuItem";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { redirectionUrlState } from "@/state/redirectionState";
import { userRentalState } from "@/state/userRentalState";

export default function DetailHeader() {
  const router = useRouter();
  const redirect = useRecoilValue(redirectionUrlState);
  const userAlreadyBook = useRecoilValue(userRentalState);
  

  const goBack = () => {
    // if(userAlreadyBook.canUserBook) {
    //   router.push('/');
    //   return
    // }
    if(redirect.redirectUrl) {
      router.push(redirect.redirectUrl)
      return
    }
    else {
      router.push("/")
    }
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
