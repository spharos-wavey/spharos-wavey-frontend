import React from "react";
import DetailLayout from "@/components/pages/carDetail/DatilLayout";
import DetailInfoTop from "@/components/pages/carDetail/DetailInfoTop";

export default function carDetail() {
  return (
    <>
      <DetailInfoTop />
    </>
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
