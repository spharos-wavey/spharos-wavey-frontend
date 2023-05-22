import Image from "next/image";
import Link from "next/link";
import style from "./SimpleBackLayout.module.css";
import { useRouter } from "next/router";

export default function SimpleBackLayout(props: {
  children?: React.ReactNode;
  title?: React.ReactNode;
}) {
  const router = useRouter();

  const handleBack = () => {
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
            <li className={style.title}>{props.title}</li>
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
