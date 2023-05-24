import React, { use, useEffect, useState } from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import { useRouter } from "next/router";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CarList from "@/components/pages/car/CarList";
import { carListType, carListbyBrandDataType } from "@/types/carDataType";
import SectionTitle from "@/components/ui/SectionTitle";
import Separator from "@/components/ui/Separator";
import axios from "axios";
import { brandSortType } from "@/types/brandSortType";

function BrandSort(props: { data: carListType[] }) {
  const router = useRouter();
  const { brandName } = router.query;
  const [brand, setBrand] = useState<string>("");
  const { data } = props;
  const [allBrand, setAllBrand] = useState<brandSortType[]>();
  const [carList, setCarList] = useState<carListbyBrandDataType[]>([]);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (brandName) {
      setBrand(brandName as string);
    }
  }, [brandName]);
  console.log("brandName", brandName);

  useEffect(() => {
    axios
      .get(`https://api-billita.xyz/carbrand`)
      .then((res) => {
        setAllBrand(res.data);
        console.log(`모든 브랜드 데이터:`, allBrand);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (allBrand) {
      const idData = allBrand?.find((item) => {
        item.brandName === brandName && setId(item.id);
      });
      if (idData) {
        setId(idData.id);
        console.log(`매칭 아이디`, idData.id);
      }
    }
  }, [allBrand, brandName]);


  console.log(`전체 브랜드 리스트`, allBrand);

  return (
    <main>
      <section>
        <SectionTitle
          fontSize={0.9}
        >{`빌리타에서 이용가능한 ${brand} 차량`}</SectionTitle>
        <Separator gutter={1} />
        <CarList data={carList} idData={id} />
      </section>
    </main>
  );
}

BrandSort.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="브랜드별 조회">{Page}</SimpleBackLayout>;
};

export default BrandSort;

export const getServerSideProps = async (context: Params) => {
  const { brandName } = context.query;

  // const res = await fetch(`https://api-billita.xyz/frame/brands/${brandName}`);
  // const data = await res.json();

  const dummy: carListType[] = [
    {
      carBrand: "Tesla",
      carName: "Model 3",
      carImage:
        "https://storage.googleapis.com/bucket_billita_vehicle/ac6050b590c42d7f/Tesla/%ED%85%8C%EC%8A%AC%EB%9D%BC_%EB%AA%A8%EB%8D%B8S_Deep%20Blue%20Metallic.png",
      defaultPrice: 27000,
      billitaZone: "센텀프리미어 호텔",
      canBook: true,
      purchaseStatus: "REVERSATION",
    },
    {
      carBrand: "Benz",
      carName: "Model 3",
      carImage:
        "https://storage.googleapis.com/bucket_billita_vehicle/ac6050b590c42d7f/Tesla/%ED%85%8C%EC%8A%AC%EB%9D%BC_%EB%AA%A8%EB%8D%B8S_Deep%20Blue%20Metallic.png",
      defaultPrice: 27000,
      billitaZone: "센텀프리미어 호텔",
      canBook: true,
      purchaseStatus: "REVERSATION",
    },
  ];

  return {
    props: {
      data: dummy,
    },
  };
};
