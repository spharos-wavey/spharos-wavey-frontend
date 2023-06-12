import React, { useEffect, useState } from "react";
import style from "./MapHeader.module.css";
import { mapHeaderIcon } from "@/datas/staticMenuDatas";
import MenuItem from "../MenuItem";
import { useRouter } from "next/router";

export default function MapHeader() {

  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(true);
  const handleLink = (path:string) => {
    router.push(path);
  }

  // get touch event
  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0].clientY > 100) {
        setIsActive(true);
      } 
    };
    window.addEventListener("touchmove", handleTouch);
    return () => {
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  // interval 3s for slide down
  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(false);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  
  return (
    <div className={isActive ? `${style.header} ${style.close}` : style.header}>
      <nav>
        <ul>
          {
            mapHeaderIcon.map((item)=>{
              return (
                <MenuItem
                  menuItem={item}
                  key={item.id}
                  onClick={()=>handleLink(item.path)}
                />
              )
            })
          }
        </ul>
      </nav>
    </div>
  );
}
