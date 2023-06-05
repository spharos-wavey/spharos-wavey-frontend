import React from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalWrapper from "@/components/pages/rental/RentalWrapper";

export default function Detail() {

  return <main> <RentalWrapper /></main>;
}

Detail.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="대여 내용 상세">{Page}</SimpleBackLayout>;
};
