import React, { use, useState } from "react";
import { useRouter } from "next/router";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import LicenseWrapper from "@/components/pages/license/LicenseWrapper";

export default function License() {
  const router = useRouter();
  const [extractedPageNo, setExtractedPageNo] = useState<string>("");
  const handleRedirectPrevPage = () => {
    sessionStorage.setItem("userLicense", "true");
    router.push(sessionStorage.getItem("carDetail") as string);
    alert("뀨");
  };
  
  const extractIdForBookPage = sessionStorage.getItem("carDetail")?.split("/")[2];
  const handleOpenBookPage = () => {
    // router.push(`rental/${extractIdForBookPage}`);
  }

  const handleRegister = () => {
    console.log(extractIdForBookPage);
    sessionStorage.getItem("userLicense")
      ? handleOpenBookPage()
      : handleRedirectPrevPage();
  };
  return (
    <main>
      <section>
        <div>
          <LicenseWrapper />
        </div>
      </section>
      <BottomFixedContainer>
        <Button
          btnType={"button"}
          btnEvent={() => handleRegister()}
          shadow={true}
        >
          등록하기
        </Button>
      </BottomFixedContainer>
    </main>
  );
}

License.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="운전면허증 등록">{Page}</SimpleBackLayout>;
};
