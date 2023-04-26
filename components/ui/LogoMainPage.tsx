import Image from 'next/image'
import style from "@/components/ui/LogoMainPage.module.css"

export default function LogoMainPage() {
  return (
    <div>
      <div className={style.logoImgWrap}>
        <Image src="/assets/images/common/billitaLogo.svg" width={160} height={56} alt="Welcome to Billita"/>
      </div>
    </div>
  )
}
