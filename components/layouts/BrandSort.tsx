import { brandSortData } from "@/datas/brandSortData";
import SectionTitle from "./SectionTitle";
import style from "@/components/layouts/BrandSort.module.css";
import { brandSortType } from "@/types/brandSortType";
import BrandSortItem from "./BrandSortItem";
import Separator from "../ui/Separator";

export default function BrandSort() {
  return (
    <>
      <Separator gutter={2} />
      <div className={style.sectionWrap}>
        <SectionTitle>브랜드 별 검색</SectionTitle>
        <div className={style.brandNav}>
          {brandSortData.map((item: brandSortType) => {
            return <BrandSortItem item={item} key={item.id} />;
          })}
        </div>
      </div>
    </>
  );
}
