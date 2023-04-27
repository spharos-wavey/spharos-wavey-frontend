import Link from "next/link"
import style from "@/components/layouts/BrandSort.module.css"
import { brandSortType } from "@/types/brandSortType"
import Image from 'next/image'

export default function BrandSortItem(props: {item: brandSortType}) {
  return (
    <>
    <Link className={style.brandWrap} href={props.item.path}>
      <div className={style.circlePad}>
        <Image src={props.item.icon} width={40} height={40} alt={props.item.name} priority />
      </div>
      <div className={style.brandName}>{props.item.name}</div>
    </Link>
    </>
  )
}
