import React, { useEffect } from 'react'
import style from './AuthChecker.module.css'
import { useRouter } from 'next/router';
import PageLoader from '../ui/PageLoader';
import { useRecoilValue} from 'recoil';
import { authState } from '@/state/authState';
export default function AuthChecker() {

  const router = useRouter();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    const interval = setInterval(() => {
      if(auth.auth) {
        router.push("/");
      }
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
