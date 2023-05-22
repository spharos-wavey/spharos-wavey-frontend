import Image from 'next/image'
import style from "@/components/ui/Logo.module.css"

export default function Logo(props: {center: boolean}) {
  return (
    <section className={props.center ? style.logoCenter : style.logoImgWrap}>
      {props.center ? <></> : <h1>Billita</h1>}
      <Image src="/assets/images/common/billitaLogo.svg" width={129} height={65} alt="Welcome to Billita"/>
    </section>
  )
}
