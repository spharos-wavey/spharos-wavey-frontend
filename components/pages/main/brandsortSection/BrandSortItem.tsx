import style from "@/components/pages/main/brandsortSection/BrandSortItem.module.css";
import { brandSortType } from "@/types/brandSortType";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BrandSortItem(props: { item: brandSortType }) {
  const router = useRouter();

  const handleSortbyBrand = () => {
    router.push(`/car/brand?brandName=${props.item.name}`);
  };

  console.log(props.item);

  return (
    <div className={style.brandWrap}>
      <div className={style.circlePad} onClick={handleSortbyBrand}>
        <Image
          src={
            props.item.icon !== undefined
              ? props.item.icon
              : "/assets/images/common/billitaLogoOnly.svg"
          }
          width={40}
          height={40}
          alt={props.item.name}
          priority
        />
      </div>
      <div className={style.brandName}>{props.item.name}</div>
    </div>
  );
}
