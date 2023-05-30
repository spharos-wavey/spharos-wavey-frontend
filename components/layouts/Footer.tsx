import { footerMenuData } from "@/datas/staticMenuDatas";
import { footerType } from "@/types/footerType";
import { useRouter } from "next/router";
import style from "@/components/layouts/Footer.module.css";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className={style.footer}>
      <nav>
        <ul>
          {footerMenuData.map((menuItem: footerType) => {
            return (
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
