import Image from 'next/image'
import style from "@/components/ui/Logo.module.css"

export default function Logo() {
  return (
    <section className={style.logoImgWrap}>
      <h1>Billita</h1>
      <Image src="/assets/images/common/billitaLogo.svg" width={129} height={65} alt="Welcome to Billita"/>
    </section>
  )
}
