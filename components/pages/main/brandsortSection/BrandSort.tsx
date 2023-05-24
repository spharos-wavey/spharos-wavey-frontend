// import { brandSortData } from "@/datas/brandSortData";
import SectionTitle from "@/components/ui/SectionTitle";
import style from "@/components/pages/main/brandsortSection/BrandSort.module.css";
import { brandSortType } from "@/types/brandSortType";
import BrandSortItem from "./BrandSortItem";

export default function BrandSort(props: { data: brandSortType[] }) {
  const data = props.data;

  return (
    <section>
      <SectionTitle>브랜드 별 검색</SectionTitle>
      <div className={style.brandNav}>
        {data && data.map((item: brandSortType) => {
          return <BrandSortItem item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
}
