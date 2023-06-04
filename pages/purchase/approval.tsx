import { authState } from '@/state/authState'
import axios from 'axios';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function Paysuccess() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const PG_TOKEN = router.query.pg_token;
  console.log(PG_TOKEN);
  
  const [purchaseNo, setPurchaseNo] = useState<string | null>("");
  const [authValue, setAuthValue] = useState<string | null>("");

  useEffect(()=> {
    if(typeof window !== undefined){
      const purNo = sessionStorage.getItem("purchaseNumber");
      const authLocal = localStorage.getItem("token");
      setPurchaseNo(purNo ? purNo : null);
      setAuthValue(authLocal ? authLocal : null)
    }
  },[purchaseNo, authValue])
  console.log(authValue);
  console.log(purchaseNo);
  console.log(PG_TOKEN);

  // if(PG_TOKEN !== undefined) {
  useEffect(() => {
    console.log(PG_TOKEN, purchaseNo, "ddddㅇㅇ찍힘 친구한테 물어볼 차ㄹ_인가");
    const postPaymentApprove = async () => {
      if( PG_TOKEN !== null && PG_TOKEN !== undefined && purchaseNo !== null) {
        console.log("api 주소 똑바로 보고 변수 제대로 지정하고 함수호출 눈부릅뜨고하자!!!!!")
      try {
        const response = await axios.post(
          `${API_URL}/purchase/kakao/approve`, {
            purchaseNumber: purchaseNo,
            pg_token: PG_TOKEN
          },
          {
            headers: {
              Authorization: `Bearer ${authValue}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
      }else{
        console.log("^_^;;)>>", PG_TOKEN, purchaseNo);
      };
    
  }
  postPaymentApprove();
},[PG_TOKEN, purchaseNo])
// }

  return (
    <div>test</div>
  )
}
