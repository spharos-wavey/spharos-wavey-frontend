import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { authState } from "@/state/authState";
import style from "./SimpleBackLayout.module.css";
import { userRentalState } from "@/state/userRentalState";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function SimpleBackLayout(props: {
  children?: React.ReactNode;
  title?: React.ReactNode;
}) {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const [redirectUrlValue, setRedirectUrlValue] = useState<string>();
  const canUserRentMore = useRecoilValue(userRentalState);
  const { brandName } = router.query;
  const pageUrl = router.pathname;

  useEffect(() => {
    if (typeof window !== undefined) {
      const redirectUrl = sessionStorage.getItem("redirectUrl");
      redirectUrl !== null
        ? setRedirectUrlValue(redirectUrl)
        : setRedirectUrlValue("");
    }
  }, []);

  const handleBack = () => {
    if (pageUrl.includes("/rental/")) {
      router.push("/");
      return;
    }
    if (pageUrl === "/car/brand") {
      router.push("/");
      return;
    }
    if (!auth.auth && redirectUrlValue) {
      router.push(redirectUrlValue);
      return;
    }
    router.back();
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div>
      <ScrollToTop />
      <header className={style.headerContainer}>
        <nav>
          <ul>
            <li
              className={pageUrl.includes("smartkey") ? `${style.hidden}` : ``}
              onClick={handleBack}
            >
              <Image
                src="/assets/images/icons/leftArrowIconBlack.svg"
                alt="Back"
                width={20}
                height={20}
                priority={true}
              />
            </li>
            <li className={style.title}>
              {props.title} {brandName ? `(${brandName})` : null}
            </li>
            <li
              onClick={handleClose}
              className={
                pageUrl.includes("smartkey")
                  ? `${style.closerButton}`
                  : `${style.hidden}`
              }
            >
              <Image
                src="/assets/images/icons/closePureX.svg"
                alt="Back"
                width={25}
                height={25}
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
