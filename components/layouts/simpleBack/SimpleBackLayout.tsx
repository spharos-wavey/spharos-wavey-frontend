import Image from "next/image";
import style from "./SimpleBackLayout.module.css";
import { useRouter } from "next/router";

export default function SimpleBackLayout(props: {
  children?: React.ReactNode;
  title?: React.ReactNode;
}) {
  const router = useRouter();
  const { brandName } = router.query;

  const pageUrl = router.pathname;
  console.log(pageUrl);

  const handleBack = () => {
    if (pageUrl === "/car/brand") {
      router.push("/");
      return;
    }
    router.back();
    if(pageUrl === "/login") {
      window.history.go(-1);
    }
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
