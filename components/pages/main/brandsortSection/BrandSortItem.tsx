import style from "@/components/pages/main/brandsortSection/BrandSortItem.module.css";
import { brandSortType } from "@/types/brandSortType";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BrandSortItem(props: { item: brandSortType }) {
  const router = useRouter();

  const handleSortbyBrand = () => {
    router.push(`/car/brand?brandName=${props.item.brandName}`);
  };

  return (
    <div className={style.brandWrap}>
      <div className={style.circlePad} onClick={handleSortbyBrand}>
        <Image
          src={
            props.item.brandImgUrl !== undefined
              ? props.item.brandImgUrl
              : "/assets/images/common/billitaLogoOnly.svg"
          }
          width={40}
          height={40}
          alt={props.item.brandName}
          priority
        />
      </div>
      <div className={style.brandName}>{props.item.brandName}</div>
    </div>
  );
}
