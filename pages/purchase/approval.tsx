import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PageLoader from '@/components/ui/PageLoader';
import style from './approval.module.css'

export default function Paysuccess() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const PG_TOKEN = router.query.pg_token;
  
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

  useEffect(() => {
    const postPaymentApprove = async () => {
      if( PG_TOKEN !== null && PG_TOKEN !== undefined && purchaseNo !== null) {

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
      };
    
  }
  postPaymentApprove();
},[PG_TOKEN, purchaseNo])

  return (
    <div>결제가 완료되었습니다. 확인 페이지로 이동합니다.</div>
  )
}
