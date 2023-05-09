import Image from "next/image";
import Link from "next/link";
import style from "./SimpleBackLayout.module.css";

export default function SimpleBackLayout(props: {
  children: React.ReactNode;
  title?: React.ReactNode;
}) {
  return (
    <div>
      <header className={style.headerContainer}>
        <nav>
          <ul>
            <Link href="/">
              <div className={style.img}>
                <Image
                  src="/assets/images/icons/leftArrowIconBlack.svg"
                  alt="Back"
                  width={20}
                  height={20}
                  priority={true}
                />
              </div>
            </Link>
            <div className={style.title}>{props.title}</div>
          </ul>
        </nav>
      </header>
      {props.children}
    </div>
  );
}
