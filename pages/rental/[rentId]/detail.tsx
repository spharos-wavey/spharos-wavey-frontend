import React from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalWrapper from "@/components/pages/rental/RentalWrapper";
import { rentalDataType } from "@/types/rentalDataType";
import { RentalData } from "@/datas/RentalData";

export default function Detail(props: { data: rentalDataType }) {
  const data = props.data;
  return (
    <main>
      <RentalWrapper data={data} />
    </main>
  );
}

Detail.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="대여 내용 상세">{Page}</SimpleBackLayout>;
};

export async function getServerSideProps(context: {
  query: { rentId: string };
}) {
  const { rentId } = context.query;
  console.log("rentId : ",rentId);

  const result = RentalData.find(
    (rental) => rental.rentalId === Number(rentId)
  );
  if (!result) {
    return;
  }
  console.log(result);

  return {
    props: {
      data: result,
    },
  };
}
