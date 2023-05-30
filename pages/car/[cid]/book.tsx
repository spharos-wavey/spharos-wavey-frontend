import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import { RentalDataType } from "@/types/rentalDataType";
import CarBook from "@/components/pages/car/CarBook";
import { BookListDataType } from "@/types/carDataType";

export default function BookCar() {
  const router = useRouter();
  const [data, setData] = useState<RentalDataType>();
  const v_id = router.query;
  console.log("라우터쿼리로 차량아이디 확인", v_id);
  const [bookIdData, setBookIdData] = useState<number>(0);
  const [bookListInfoData, setBookListInfoData] = useState<BookListDataType>({} as BookListDataType);
 

  useEffect(() => {
    const postBookListData = async () => {
      const token = "Bearer " + localStorage.getItem("Authorization");
      try {
        const res = await axios.post(
          `https://api-billita.xyz/booklist`,
          {
            vehicleId: v_id,
            // startDate: router.query.startDate,
            // endDate: router.query.endDate,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        getBookListInfoData(res.data);
      } catch (err) {
        console.log("Error while posting booklist");
      }
    };
    postBookListData();
  }, [bookIdData]);

  const getBookListInfoData = async (b_id: number) => {
    const res = await axios.get(
      `https://api-billita.xyz/booklist/information/${b_id}`
    );
    const data = res.data;
    setBookListInfoData(data);
  };

  return (
    <main>
      <CarBook data={bookListInfoData}/>
    </main>
  );
}

BookCar.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="예약 확인">{Page}</SimpleBackLayout>;
};
