import { footerMenuData } from "@/datas/staticMenuDatas";
import { footerType } from "@/types/footerType";
import { useRouter } from "next/router";
import style from "@/components/layouts/Footer.module.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { authState } from "@/state/authState";

export default function Footer() {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  return (
    <footer className={style.footer}>
      <nav>
        <ul>
          {footerMenuData.map((menuItem: footerType) => {
            return (
              
              auth.auth && menuItem.id === 3 ? 
                <li
                  key={menuItem.id}
                  onClick={() => console.log("로그아웃")}
                  className={
                    router.pathname === menuItem.path ? style.active : ""
                  }
                >
                  <div className={style.footerIconContainer}>
                    <Image
                      src={
                        router.pathname === menuItem.path
                          ? menuItem.iconActive
                          : menuItem.icon
                      }
                      width={30}
                      height={30}
                      alt={menuItem.name}
                    />
                  </div>
                </li> 
              :
                <li
                  key={menuItem.id}
                  onClick={() => router.push(menuItem.path)}
                  className={
                    router.pathname === menuItem.path ? style.active : ""
                  }
                >
                  <div className={style.footerIconContainer}>
                    <Image
                      src={
                        router.pathname === menuItem.path
                          ? menuItem.iconActive
                          : menuItem.icon
                      }
                      width={30}
                      height={30}
                      alt={menuItem.name}
                    />
                  </div>
                </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
