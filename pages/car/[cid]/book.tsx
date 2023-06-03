import React from "react";
import { GetServerSideProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CarBook from "@/components/pages/car/CarBook";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";

export default function Book() {
  return (
    <main>
      <CarBook />
    </main>
  );
}

Book.getLayout = function getLayout(Page: React.ReactElement) {
  return <SimpleBackLayout title={`예약하기`}>{Page}</SimpleBackLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: Params
) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/vehicle/${context.params.cid}`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
