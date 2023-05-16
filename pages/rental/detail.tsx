import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import React from "react";
import RentalWrapper from "@/components/pages/rental/RentalWrapper";

export default function Page() {
  return (
    <main>
      <RentalWrapper />
    </main>
  );
}

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="예약 확인">{Page}</SimpleBackLayout>;
};
