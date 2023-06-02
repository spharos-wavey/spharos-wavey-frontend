import React, { useEffect, useState } from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalWrapper from "@/components/pages/rental/RentalWrapper";
import { MyRentalCarType, RentalDataType } from "@/types/rentalDataType";
import axios from "axios";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState } from "@/state/authState";

export default function Detail() {
  const router = useRouter();
  const { rentId } = router.query;
  const [rentData, setRentData] = useState<MyRentalCarType>({} as MyRentalCarType);
  const [carData, setCarData] = useState<RentalDataType>();
  const auth = useRecoilValue(authState);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = "Bearer " + auth.token;


  useEffect(() => {
    const getData = async () => {
      if (rentId !== undefined) {
        try {
          const response = await axios.get(
            `${API_URL}/rental?id=${rentId}`,
            {
              headers: {
                Authorization: TOKEN,
                uid: auth.uid,
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
    const res = await axios.get(`${API_URL}/vehicle/${v_id}`);

    const data = res.data;
    setCarData(data);
  };

  return <main>{carData && <RentalWrapper data={carData} rentData={rentData}/>}</main>;
}

Detail.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="대여 내용 상세">{Page}</SimpleBackLayout>;
};