import React from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalWrapper from "@/components/pages/rental/RentalWrapper";

export default function Page({}) {
  //예약확인과 대여내용상세에서 불러오는 내용이 같기때문에, 분기처리로 하고싶다!
  return (
    <main>
      <RentalWrapper />
    </main>
  );
}

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="예약 확인">{Page}</SimpleBackLayout>;
};

export async function getServerSideProps(context: Params) {
  return{
    props: {data},
  }
}