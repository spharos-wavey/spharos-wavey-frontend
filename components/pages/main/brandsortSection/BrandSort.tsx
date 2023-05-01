import { brandSortData } from "@/datas/brandSortData";
import SectionTitle from "@/components/ui/SectionTitle";
import style from "@/components/pages/main/brandsortSection/BrandSort.module.css";
import { brandSortType } from "@/types/brandSortType";
import BrandSortItem from "./BrandSortItem";

export default function BrandSort() {
  return (
    <section>
      <div className={style.sectionWrap}>
        <SectionTitle>브랜드 별 검색</SectionTitle>
      </div>
      <div className={style.brandNav}>
        {brandSortData.map((item: brandSortType) => {
          return <BrandSortItem item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
}
