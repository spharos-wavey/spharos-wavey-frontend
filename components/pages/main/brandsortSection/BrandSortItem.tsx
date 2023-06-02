import style from "@/components/pages/main/brandsortSection/BrandSortItem.module.css";
import { brandSortType } from "@/types/brandSortType";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BrandSortItem(props: { item: brandSortType }) {
  const router = useRouter(); 
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, error => {
        console.log(error)
      });
    }
  }, []);

  const handleSortbyBrand = () => {
    router.push(`/car/brand?brandId=${props.item.id}&brandName=${props.item.brandName}&lat=${lat}&lng=${lng}`);
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
