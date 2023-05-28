import React, { useEffect, useState } from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalWrapper from "@/components/pages/rental/RentalWrapper";
import { RentalDataType } from "@/types/rentalDataType";
import axios from "axios";
import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const [data, setData] = useState<RentalDataType>();
  
  console.log(router.query);
  const RentID = Number(router.query.rentId);
  // console.log(`detail data : `, data);

  useEffect(() => {
    const getData = async () => {
      if (router.query.rentId !== undefined) {
        const rentId = Number(router.query.rentId);
        try {
          const response = await axios.get(
            `https://api-billita.xyz/vehicle/${rentId}`
          );
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching rental data:", error);
        }
      }
    };

    getData();
  }, [router.query.rentId]);

  return (
    <main>
      {data &&
      <RentalWrapper data={data} />
      }
    </main>
  );
}

Detail.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="대여 내용 상세">{Page}</SimpleBackLayout>;
};

// export async function getServerSideProps(context: {
//   query: { v_id: string };
// }) {
//   try {
//     const res = await axios.get(`https://api-billita.xyz/vehicle/${context.query.v_id}`);
//     const data = res.data;
//     console.log(data);

//     if(res.status === 200) {
//       return {
//         props: {
//           data: data,
//         },
//       };
//     }
//   } catch (err) {
//   }
// }
