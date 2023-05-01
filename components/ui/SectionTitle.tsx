import style from "@/components/ui/SectionTitle.module.css"

export default function SectionTitle(props:{children:string, id?:any}) {
  return (
    <div className={style.sectionTitle}>{props.children}</div>
  )
}
