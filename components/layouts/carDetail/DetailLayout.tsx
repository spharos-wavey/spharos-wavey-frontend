import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DetailHeader from "./DetailHeader";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import { useRecoilValue } from "recoil";
import { authState } from "@/state/authState";

export default function DetailLayout(props: { children: React.ReactNode }) {

  const auth = useRecoilValue(authState);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = "Bearer " + auth.token;
  const router = useRouter();
  const cid = router.query.cid;

  const [canRental, setCanRental] = useState<boolean>(true);

  useEffect(() => {
    if (auth.auth) {
      const getData = async () => {
        try {
          const res = await fetch(
            `${API_URL}/rental/can-rental`,{
              method: "GET",
              headers: {
                Authorization: TOKEN, 
                uid: auth.uid
              }});
          const data = await res.json();
          setCanRental(data);
        } catch (err) {
          console.log(err);
        }
      }
      getData();
    }
  }, []);

  const handleCheckNextStep = () => {
    sessionStorage.setItem("redirectUrl",`/car/${cid}/license`)
    router.push(`/car/${cid}/license`);
  }

  return (
    <>
      <DetailHeader />
      <div>{props.children}</div>
      {
        canRental && 
        <BottomFixedContainer backgroundColor="transparent">
          <Button
            btnType={"button"}
            btnEvent={() => handleCheckNextStep()}
            shadow={true}
          >
            예약하기
          </Button>
        </BottomFixedContainer> 
      }
    </>
  );
}
