import React from "react";
import style from "./index.module.css";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Page() {
  return (
  <main>
    <section>
      <div className={style.sectionWrap}>
        <SectionTitle fontSize={0.85}>운전면허 정보입력</SectionTitle>
      </div>
    </section>
  </main>
  );
}

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="운전면허증 등록">{Page}</SimpleBackLayout>;
};
