// import { brandSortData } from "@/datas/brandSortData";
import SectionTitle from "@/components/ui/SectionTitle";
import style from "@/components/pages/main/brandsortSection/BrandSort.module.css";
import { brandSortType } from "@/types/brandSortType";
import { brandSortData } from "@/datas/brandSortData";
import BrandSortItem from "./BrandSortItem";
import { useEffect, useState } from "react";

export default function BrandSort(props: { data: brandSortType[] }) {
  const [billitaBrands, setBillitaBrands] = useState<brandSortType[]>();
  const data = props.data;

  useEffect(() => {
    if (data === undefined) return;
    const billitaBrands:brandSortType[] = []
    brandSortData.map((item) => {
      data.forEach((dataItem) => {
        if (item.name === dataItem.name) {
          billitaBrands.push(item);
        }
      })
    });
    setBillitaBrands(billitaBrands);
  }, []);
  
  return (
    <section>
      <SectionTitle>브랜드 별 검색</SectionTitle>
      <div className={style.brandNav}>
        {billitaBrands && billitaBrands.map((item: brandSortType) => {
          return <BrandSortItem item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
}
