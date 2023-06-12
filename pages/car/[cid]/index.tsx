import React from "react";
import { GetServerSideProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { carDataType } from "@/types/carDataType";
import DetailInfoWrapper from "@/components/pages/carDetail/DetailInfoWrapper";
import DetailLayout from "@/components/layouts/carDetail/DetailLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function carDetail(props: { data: carDataType }) {

  return (
    <main id="carDetail">
      <DetailInfoWrapper carData={props.data} />
    </main>
  );
}

carDetail.getLayout = function getLayout(Page: React.ReactNode) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DetailLayout>{Page}</DetailLayout>
    </LocalizationProvider>
  )
};

export const getServerSideProps: GetServerSideProps = async (context:Params) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // const res = await fetch(`${API_URL}/vehicle/${context.params.cid}`);
  const res = await fetch(`${API_URL}/vehicle/${context.params.cid}`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}
