import React, { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalWrapper from "@/components/pages/rental/RentalWrapper";
import { MyRentalCarType, RentalDataType } from "@/types/rentalDataType";

import { useRecoilValue } from "recoil";
import { authState } from "@/state/authState";
import { carDataType } from "@/types/carDataType";

export default function Detail(props: { data : carDataType }) {
  const router = useRouter();
  const { rentId } = router.query;
  const [rentData, setRentData] = useState<MyRentalCarType>({} as MyRentalCarType);
  const [carData, setCarData] = useState<RentalDataType>();
  const auth = useRecoilValue(authState);
  const TOKEN = "Bearer " + auth.token;


//approval.tsx 에서 /rental/[rentId]?vehicleId=${vehicleId}
//결제승인 responseBody에서 vehicleId도 같이 받기


  return <main>{props.data && <RentalWrapper data={props.data} />}</main>;
}

Detail.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="대여 내용 상세">{Page}</SimpleBackLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context:Params) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/vehicle/1`);
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}
