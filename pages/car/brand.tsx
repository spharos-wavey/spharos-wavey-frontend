import React from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import { useRouter } from "next/router";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CarList from "@/components/pages/car/CarList";
import { carListbyBrandDataType } from "@/types/carDataType";

function BrandSort(props: { data: carListbyBrandDataType[] }) {
  const router = useRouter();
  const { brandName } = router.query;
  const { data } = props;

  return (
    <main>
      <section>
        <CarList data={data} />
      </section>
    </main>
  );
}

BrandSort.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title={`브랜드별 조회`}>{Page}</SimpleBackLayout>;
};

export default BrandSort;

export const getServerSideProps = async (context: Params) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const url = `${API_URL}/carbrand/maker/${context.query.brandId}?lat=${context.query.lat}&lng=${context.query.lng}&page=1&size=20`;
  console.log('apiurl',url)

  const res = await fetch(url);
  const data = await res.json();
  console.log(data)

  return {
    props: {
      data: data,
    },
  };
};
