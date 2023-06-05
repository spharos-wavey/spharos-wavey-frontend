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
  const [rentId, setRentId] = useState<string | null>("");

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
        console.log(data.rentId);
        setRentId(data.rentId);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
      }else{
      };
    
  }
  postPaymentApprove();
},[PG_TOKEN, purchaseNo])


useEffect(() => {
  const timeout = setTimeout(() => {
    console.log(rentId, "결제승인 내 체크");
    router.push(`/rental/${rentId}`); 
  }, 2000);

  return () => {
    clearTimeout(timeout);
  };
}, [rentId]);

  return (
    <PageLoader text="결제가 진행중입니다." />
  )
}
