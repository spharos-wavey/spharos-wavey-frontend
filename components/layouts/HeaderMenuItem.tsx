import { headerMenuType } from '@/types/headerType'
import Image from 'next/image'

export default function HeaderMenuItem(props:{ menuItem:headerMenuType }) {
  return (
    <li>
      <Image src={props.menuItem.icon} width={200} height={200} alt={props.menuItem.name} priority />
    </li>
  )
}
