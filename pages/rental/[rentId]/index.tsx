import React from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import ConfirmWrapper from "@/components/pages/rental/ConfirmWrapper";
import { rentalDataType } from '@/types/rentalDataType'
import { RentalData } from "@/datas/RentalData";

export default function RentalConfirm( props: {data: rentalDataType} ) {
  //예약확인과 대여내용상세에서 불러오는 내용이 같기때문에, 분기처리로 하고싶다!
  console.log(props.data)
  const data = props.data;
  return (
    <main>
      <ConfirmWrapper data={data}/>
    </main>
  );
}

RentalConfirm.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="예약 확인">{Page}</SimpleBackLayout>;
};

export async function getServerSideProps(context: { query: { rentId: string; }; }) {
  const { rentId } = context.query;
  console.log(rentId);

  const result = RentalData.find((rental) => rental.rentalId === Number(rentId))
  if (!result) {
    return
  }
  console.log(result);

  return {
    props: {
      data: result,
    },
  };
}