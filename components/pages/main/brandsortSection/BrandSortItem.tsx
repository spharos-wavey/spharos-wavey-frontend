import style from "@/components/pages/main/brandsortSection/BrandSortItem.module.css";
import { brandSortType } from "@/types/brandSortType";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BrandSortItem(props: { item: brandSortType }) {
  const router = useRouter(); 
  const handleSortbyBrand = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      if (lat!==0 && lng!==0) {
        router.push(`/car/brand?brandId=${props.item.id}&brandName=${props.item.brandName}&lat=${lat}&lng=${lng}&page=1&size=20`);
      }
    }, error => {
      console.log(error)
    });
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
        />
        <div className={style.circleOuter}></div>
      </div>
      <div className={style.brandName}>{props.item.brandName}</div>
    </div>
  );
}
