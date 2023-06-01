import React from "react";
import { GetServerSideProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { carDataType } from "@/types/carDataType";
import DetailInfoWrapper from "@/components/pages/carDetail/DetailInfoWrapper";
import DetailLayout from "@/components/layouts/carDetail/DetailLayout";

export default function carDetail(props: { data: carDataType }) {

  return (
    <main id="carDetail">
      <DetailInfoWrapper carData={props.data} />
    </main>
  );
}

carDetail.getLayout = function getLayout(Page: React.ReactNode) {
  return (
  <DetailLayout>{Page}</DetailLayout>
  )
};

export const getServerSideProps: GetServerSideProps = async (context:Params) => {
  console.log(context.params.cid);
  const res = await fetch(`https://api-billita.xyz/vehicle/${context.params.cid}`);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      data: data,
    },
  };
}
