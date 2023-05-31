import React, { useEffect, useState } from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalWrapper from "@/components/pages/rental/RentalWrapper";
import { MyRentalCarType, RentalDataType } from "@/types/rentalDataType";
import axios from "axios";
import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const { rentId } = router.query;
  const [rentData, setRentData] = useState<MyRentalCarType>({} as MyRentalCarType);
  const [carData, setCarData] = useState<RentalDataType>();



  useEffect(() => {
    const getData = async () => {
      if (rentId !== undefined) {
        try {
          const response = await axios.get(
            `https://api-billita.xyz/rental?id=${rentId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "Authorization"
                )}`,
                uid: localStorage.getItem("uid"),
              },
            }
          );
          const data = response.data;
          setRentData(data);
          getBookData(data.vehicleId);
        } catch (error) {
          console.error("Error fetching rental data:", error);
        }
      }
    };
    getData();
  }, [rentId]);

  const getBookData = async (v_id: number) => {
    const res = await axios.get(`https://api-billita.xyz/vehicle/${v_id}`);

    const data = res.data;
    setCarData(data);
  };

  return <main>{carData && <RentalWrapper data={carData} rentData={rentData}/>}</main>;
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
