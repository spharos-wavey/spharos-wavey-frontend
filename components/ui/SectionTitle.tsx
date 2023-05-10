import style from "@/components/ui/SectionTitle.module.css"

export default function SectionTitle(props:{children:string, id?:any, fontSize?:number}) {
  return (
    <div className={style.sectionTitle} style={{fontSize: `${props.fontSize}rem`}}>{props.children}</div>
  )
}
