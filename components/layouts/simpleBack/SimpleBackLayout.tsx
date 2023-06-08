import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { authState } from "@/state/authState";
import style from "./SimpleBackLayout.module.css";

export default function SimpleBackLayout(props: {
  children?: React.ReactNode;
  title?: React.ReactNode;
}) {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const [redirectUrlValue, setRedirectUrlValue] = useState<string>();
  const { brandName } = router.query;
  const pageUrl = router.pathname;
  useEffect(() => {
    if(typeof window !== undefined){
      const redirectUrl = sessionStorage.getItem("redirectUrl");
      redirectUrl !== null ? setRedirectUrlValue(redirectUrl) : setRedirectUrlValue("");
    }
  },[])

  const handleBack = () => {
    if (pageUrl === "/car/brand") {
      router.push("/");
      return;
    }
    if(!auth.auth && redirectUrlValue){
        router.push(redirectUrlValue);
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
