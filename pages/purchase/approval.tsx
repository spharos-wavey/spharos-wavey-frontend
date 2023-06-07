import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import axios from 'axios';
import PageLoader from '@/components/ui/PageLoader';

export default function Paysuccess() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // step 01 

  useEffect(()=> {
    if(typeof window !== undefined){
      const PURCHASE_NO = sessionStorage.getItem("purchaseNumber");
      const TOKEN = localStorage.getItem("token");
      const redirectUrl = sessionStorage.getItem("redirectUrl");
      if(PURCHASE_NO !== null && TOKEN !== null){
        handlePostPayment(PURCHASE_NO, TOKEN);
        return;
      } else {
        if(redirectUrl !== null){
          router.push(redirectUrl);
          return;
        }
        router.push("/");
        return;
      }
    }
  },[])

  // step 02

  const handlePostPayment = (PURCHASE_NO:string, TOKEN:string) => {
    console.log(PURCHASE_NO, TOKEN, "결제승인 내 체크")
    try {
        const postPaymentApprove = async () => {
          const response = await axios.post(
            `${API_URL}/purchase/kakao/approve`, {
              purchaseNumber: PURCHASE_NO,
              pg_token: TOKEN
            },
            {
              headers: {
                Authorization: `Bearer ${TOKEN}`,
              },
            }
          );
          const data = response.data;
          sessionStorage.removeItem("purchaseNumber");
          router.push(`/rental/${data.rentId}`);
        } 
        postPaymentApprove();
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <PageLoader text="결제가 진행중입니다." />
  )
}
