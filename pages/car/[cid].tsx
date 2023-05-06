import React from "react";
import DetailLayout from "@/components/layouts/carDetail/DatilLayout";
import DetailInfoWrapper from "@/components/pages/carDetail/DetailInfoWrapper";
import { useRouter } from "next/router";

export default function carDetail() {
  return (
    <main id="carDetail">
      <DetailInfoWrapper />
    </main>
  );
}

carDetail.getLayout = function getLayout(Page: React.ReactNode) {
  return <DetailLayout>{Page}</DetailLayout>;
};

// export async function getStaticPaths() {
//   // 빌드타임에 호출되는 차량 id 받아오기
//   const res = await fetch('http://..')
//   const posts = await res.json()

//   const paths = posts.map((post:any) => ({
//     params: { id: post.id },
//   }))

//   return { paths, fallback: false}
// }
