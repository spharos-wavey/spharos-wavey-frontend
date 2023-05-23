import Image from "next/image";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import Logo from "@/components/ui/Logo";
import React, { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function Page() {
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/kakao`;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      console.log(window.Kakao.isInitialized());
      console.log(window.Kakao.Auth);
    }
  }, []);

  function handleLogin() {
    if (!window.Kakao.isInitialized()) {
      return;
    }

    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
      scope: "profile_nickname, profile_image, account_email",
    });
  }

  return (
    <main>
      <div style={{ padding: "2rem", marginTop: "9rem" }}>
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center",
            marginBottom: "10vh",
          }}
        >
          로그인
        </h1>
        <div
          onClick={handleLogin}
          style={{ width: "100%", textAlign: "center" }}
        >
          <Image
            src="/assets/images/etc/kakao_login_large_wide.svg"
            width={300}
            sizes="(max-width: 600px) 100vw, 600px"
            height={45}
            alt="카카오톡으로 로그인"
            priority
          />
        </div>
        <p
          style={{
            opacity: "0.5",
            fontSize: "0.8rem",
            marginTop: "3vh",
            textAlign: "center",
          }}
        >
          서비스를 위한 최소예약가능 연령은 만 21세입니다.
        </p>
      </div>
      <div  style={{ display: "flex" }}>
        <Logo center={true}/>
      </div>
    </main>
  );
}

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout>{Page}</SimpleBackLayout>;
};
