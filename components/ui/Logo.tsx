import Image from 'next/image'
import style from "@/components/ui/Logo.module.css"

export default function Logo() {
  return (
    <div className={style.logoImgWrap}>
      <h1>Billita</h1>
      <Image src="/assets/images/common/billitaLogo.svg" width={160} height={56} alt="Welcome to Billita"/>
    </div>
  )
}
