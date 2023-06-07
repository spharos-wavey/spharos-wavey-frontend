import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import axios from 'axios';
import PageLoader from '@/components/ui/PageLoader';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { GetServerSideProps } from 'next';

const Paysuccess = (props: {pg_token:string}) => {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { pg_token } = props;

  const [isRedirect , setIsRedirect] = React.useState<string>();

  // step 01 

  useEffect(()=> {
    if(typeof window !== undefined){
      const PURCHASE_NO = sessionStorage.getItem("purchaseNumber");
      const TOKEN = localStorage.getItem("token");
      console.log(PURCHASE_NO, pg_token, "결제승인 내 체크")
      if(PURCHASE_NO !== null && pg_token !== undefined && pg_token !== null && TOKEN !== null && TOKEN !== undefined){
        handlePostPayment(PURCHASE_NO, pg_token, TOKEN);
        return;
      }
    }
  },[pg_token])

  // step 02

  const handlePostPayment = (PURCHASE_NO:string, pg_token:string, TOKEN:string) => {
    console.log(PURCHASE_NO, pg_token, "결제승인 내 체크")
    localStorage.setItem("pg_token", pg_token)
    const postPaymentApprove = async () => {
      const response = await axios.post(
        `${API_URL}/purchase/kakao/approve`, {
          purchaseNumber: PURCHASE_NO,
          pg_token: pg_token
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      return response;
    } 
    postPaymentApprove().then((res) => {
      console.log(res.data, "결제승인 내 체크")
      setIsRedirect(res.data.rentId);
      return;
    }).catch((err) => {
      console.log(err, "err")
    });
  }

  useEffect(()=> {
    if(isRedirect === undefined || isRedirect === null) return;
    router.push(`/rental/${isRedirect}`);
    return;
  },[isRedirect])


  return (
    <PageLoader text="결제가 진행중입니다." />
  )
}

export default Paysuccess

export const getServerSideProps:GetServerSideProps = async (context:Params) => {

  const { pg_token } = context.query;
  console.log(pg_token, "pg_token")
  
  return {
    props: {
      pg_token: pg_token,
    },
  };
}