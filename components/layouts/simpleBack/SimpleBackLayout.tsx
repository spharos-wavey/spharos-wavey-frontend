import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "@/state/authState";
import style from "./SimpleBackLayout.module.css";

export default function SimpleBackLayout(props: {
  children?: React.ReactNode;
  title?: React.ReactNode;
}) {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const { brandName } = router.query;

  const pageUrl = router.pathname;
  const redirectUrl = sessionStorage.getItem("redirectUrl");

  const handleBack = () => {
    if (pageUrl === "/car/brand") {
      router.push("/");
      return;
    }
    if(!auth.auth && redirectUrl){
        router.push(redirectUrl);
        return;
    }
    else if (pageUrl.includes("/rental/")){
      router.push("/");
    }
    router.back();
  }

  return (
    <div>
      <header className={style.headerContainer}>
        <nav>
          <ul>
            <li onClick={handleBack}>
              <Image
                src="/assets/images/icons/leftArrowIconBlack.svg"
                alt="Back"
                width={20}
                height={20}
                priority={true}
              />
            </li>
            <li className={style.title}>{brandName}{" "}{props.title}</li>
            <li className={style.hidden}>
              <Image
                src="/assets/images/icons/leftArrowIconBlack.svg"
                alt="Back"
                width={20}
                height={20}
                priority={true}
              />
            </li>
          </ul>
        </nav>
      </header>
      {props.children}
    </div>
  );
}
