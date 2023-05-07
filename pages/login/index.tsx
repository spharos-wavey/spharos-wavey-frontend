import Image from "next/image";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import Logo from "@/components/ui/Logo";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function page() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "https://billita.xyz";

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      console.log(window.Kakao.isInitialized);
      console.log(window.Kakao.Auth);
    }
  }, []);

  const KAKAO_AUTH_URI = `/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
  function handleLogin() {
    if (!window.Kakao.isInitialized()) {
      return;
    }

    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
    });

  }

  return (
    <main>
      <Logo />
      <div style={{ padding: "2rem", marginTop: "8rem" }}>
        <h1>kakao oauth</h1>
        <p>test page</p>
        <div onClick={handleLogin}>
          <Image
            src="/assets/images/etc/kakao_login_large_wide.svg"
            width={339}
            height={60}
            alt="카카오톡으로 로그인"
            priority
          />
        </div>
      </div>
    </main>
  );
}

page.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout>{Page}</SimpleBackLayout>;
};
