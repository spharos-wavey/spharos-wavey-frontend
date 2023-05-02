import Image from "next/image";
import Link from "next/link";
import style from "./SimpleBackLayout.module.css";

export default function SimpleBackLayout(props: { children: React.ReactNode }) {
  return (
    <div>
      <header className={style.headerContainer}>
        <nav>
          <ul>
            <Link href="/">
              <Image
                src="/assets/images/icons/leftArrowIconBlack.svg"
                alt="Back"
                width={20}
                height={20}
                priority
              />
            </Link>
          </ul>
        </nav>
      </header>
      {props.children}
    </div>
  );
}
