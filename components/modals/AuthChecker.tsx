import React, { useEffect } from 'react'
import style from './AuthChecker.module.css'
import { useRouter } from 'next/router';
import PageLoader from '../ui/PageLoader';
export default function AuthChecker() {

  const router = useRouter();
  useEffect(() => {
    // 3초 후에 로그인 페이지로 이동
    const interval = setInterval(() => {
      router.push("/login");
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={style.authContainer}>
      <PageLoader text={'예약을 위해서는 회원 인증이 필요합니다.'}/>
    </div>
  )
}
