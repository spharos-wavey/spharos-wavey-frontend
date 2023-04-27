import Image from 'next/image'
import { headerMenuType } from '@/types/headerType'
import style from "./VehicleRecommendMain.module.css"

export default function TwoIconsRow(props: {item: headerMenuType}) {
  return (
    <div className={style.eachIconhWrap}>
      <Image src={props.item.icon} width={30} height={30} alt={props.item.name} priority/>
    </div>
  )
}
