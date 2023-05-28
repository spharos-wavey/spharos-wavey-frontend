import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import ConfirmWrapper from "@/components/pages/rental/ConfirmWrapper";
import { RentalDataType } from "@/types/rentalDataType";


export default function RentalConfirm() {
  const router = useRouter();
  const [data, setData] = useState<RentalDataType>();

  console.log(router.query);
  const RentID = Number(router.query.rentId);

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

  const getBookData = async () => {
    console.log("dddddddd");
    const token = "Bearer " + localStorage.getItem("Authorization");
    const uid = localStorage.getItem("uid");
    const result = await axios.get(
      `https://api-billita.xyz/rental?id=${RentID}`,
      {
        headers: {
          Authorization: token,
          uid: uid,
        },
      }
    );
    console.log(result.data);
  };
  getBookData();

  return <main>{data && <ConfirmWrapper data={data} />}</main>;
}

RentalConfirm.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="예약 확인">{Page}</SimpleBackLayout>;
};

// export async function getServerSideProps(context: { query: { rentId: string; }; }) {
//   const { rentId } = context.query;
//   console.log(rentId);

//   const result = RentalData.find((rental) => rental.rentalId === Number(rentId))
//   if (!result) {
//     return
//   }
//   console.log(result);

//   return {
//     props: {
//       data: result,
//     },
//   };
// }
