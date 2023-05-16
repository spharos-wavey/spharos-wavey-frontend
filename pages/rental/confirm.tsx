import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import React from "react";
import ConfirmWrapper from "@/components/pages/rental/ConfirmWrapper";

export default function Page() {
  return (
    <main>
      <ConfirmWrapper />
    </main>
  );
}

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="예약 확인">{Page}</SimpleBackLayout>;
};
