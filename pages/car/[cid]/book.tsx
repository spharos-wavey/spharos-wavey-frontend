import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import CarBook from "@/components/pages/car/CarBook";

export default function BookCar() {
  
  return (
    <main>
      <CarBook />
    </main>
  );
}

BookCar.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="예약 확인">{Page}</SimpleBackLayout>;
};
