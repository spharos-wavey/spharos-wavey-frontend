import { footerMenuData } from "@/datas/staticMenuDatas";
import { footerType } from "@/types/footerType";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authState } from "@/state/authState";
import Image from "next/image";
import style from "@/components/layouts/Footer.module.css";
import Swal from "sweetalert2";
import { bookIdState } from "@/state/bookIdState";
import { nowTimeState } from "@/state/nowTime";
import { userRentalState } from "@/state/userRentalState";

export default function Footer() {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const setBookId = useSetRecoilState(bookIdState);
  const setUserRentalState = useSetRecoilState(userRentalState);

  const handleLogOut = () => {
    
    Swal.fire({
      text: "로그아웃 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      customClass: {
        confirmButton: 'mySwalConfirmButton',
        cancelButton: 'mySwalCancelButton',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();
        setBookId({bookId: 0});
        setUserRentalState({
          canUserBook: false,
        });
        setAuth({
          auth: false,
          nickName: "",
          profileImageUrl: "",
          token: "",
          uid: "",
          email: "",
        });
      }
      else{
        return
      }
    });
    
  }
  return (
    <footer className={style.footer}>
      <nav>
        <ul>
          {footerMenuData.map((menuItem: footerType) => {
            return (
              
              auth.auth && menuItem.id === 3 ? 
                <li
                  key={menuItem.id}
                  onClick={() => handleLogOut()}
                  className={
                    router.pathname === menuItem.path ? style.active : ""
                  }
                >
                  <div className={style.footerIconContainer}>
                    <Image
                      src={
                        auth.auth
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
