import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalHistory from "@/components/pages/history/RentalHistory";
import AuthRecoilChecker from "@/components/util/AuthRecoilChecker";
import { authState } from "@/state/authState";
import { MyRentalCarType } from "@/types/rentalDataType";

export default function RentHistory() {
  const [auth, setAuth] = useRecoilState(authState);
  const [rentalData, setRentalData] = useState<MyRentalCarType[]>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!auth.auth && AuthRecoilChecker() && typeof window !== "undefined") {
      setAuth({
        auth: true,
        token: localStorage.getItem("token") as string,
        uid: localStorage.getItem("uid") as string,
        nickName: localStorage.getItem("nickName") as string,
        email: localStorage.getItem("email") as string,
        profileImageUrl: localStorage.getItem("profileImageUrl") as string,
      });
    }
  }, [auth.auth, setAuth]);

  useEffect(() => {
    const getRentalAllData = async () => {
      const res = await fetch(`${API_URL}/rental/ALL`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          uid: auth.uid,
        },
      });
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setRentalData(data);
    };
    getRentalAllData();
  }, [auth.token, auth.uid, API_URL]);

  return (
    <main>
      <section>
      {rentalData && rentalData.length > 0 ? (
          <>
            {rentalData
              .filter((data: MyRentalCarType) => data.purchaseState === "RESERVATION")
              .reverse()
              .map((data: MyRentalCarType) => (
                <RentalHistory rentalData={data} key={data.rentalId} />
              ))}
            
            {rentalData
              .filter((data: MyRentalCarType) => data.purchaseState !== "RESERVATION")
              .reverse()
              .map((data: MyRentalCarType) => (
                <RentalHistory rentalData={data} key={data.rentalId} />
              ))}
          </>
        ) : (
          "이용 내역이 없습니다."
        )}
      </section>
    </main>
  );
}

RentHistory.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="이용 내역">{Page}</SimpleBackLayout>;
};
