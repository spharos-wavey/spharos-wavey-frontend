import React, { useEffect } from 'react'
import router from 'next/router'
import PageLoader from '@/components/ui/PageLoader'

export default function cancel() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/'); 
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [router]);
  return (
    <PageLoader text="결제를 취소 하셨습니다. 메인화면으로 이동합니다." />
  )
}
