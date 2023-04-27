import SectionTitle from '@/components/layouts/SectionTitle'
import Separator from '@/components/ui/Separator'
import style from '@/components/pages/main/SpotRecommend.module.css'
import SpotCard from './SpotCard'

export default function SpotRecommand() {
  return (
    <>
      <Separator gutter={2}/>
      <div className={style.sectionWrap}>

        <SectionTitle>여 가보이소~</SectionTitle>
        <Separator gutter={0.4} />
        <div className={style.cardsWrap}>
          <SpotCard />
        </div>
      </div>
    </>
  )
}
