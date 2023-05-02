import Image from "next/image";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import Logo from "@/components/ui/Logo";
import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <main>
      <Logo />
      <div style={{ padding: "2rem", marginTop: "8rem" }}>
        <h1>kakao oauth</h1>
        <p>test page</p>
        <div>
          <Link href="#">
            <Image
              src="/assets/images/etc/kakao_login_large_wide.svg"
              width={339}
              height={60}
              alt="카카오톡으로 로그인"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}

page.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout>{Page}</SimpleBackLayout>;
};
