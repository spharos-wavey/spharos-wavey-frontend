import React, { use, useState } from "react";
import { useRouter } from "next/router";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import LicenseWrapper from "@/components/pages/license/LicenseWrapper";

export default function License() {
  // const router = useRouter();
  // const [extractedPageNo, setExtractedPageNo] = useState<string>("");
  // const handleRedirectPrevPage = () => {
  //   sessionStorage.setItem("userLicense", "true");
  //   router.push(sessionStorage.getItem("carDetail") as string);
  //   alert("뀨");
  // };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  // const extractIdForBookPage = sessionStorage.getItem("carDetail")?.split("/")[2];
  // const handleOpenBookPage = () => {
  //   // router.push(`rental/${extractIdForBookPage}`);
  // }

  const handleRegister = () => {
    // console.log(extractIdForBookPage);
    // sessionStorage.getItem("userLicense")
    //   ? handleOpenBookPage()
    //   : handleRedirectPrevPage();
  };
  return (
    <main>
      <section>
        <form onSubmit={handleFormSubmit} action="https://api-billita.xyz/carLicense" method="post">
        <div>
          <LicenseWrapper />
        </div>
        <Button
          btnType={"submit"}
          btnEvent={() => handleRegister()}
          shadow={true}
          width={320}
        >
          등록하기
        </Button>
      </form>
      </section>
    </main>
  );
}

License.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="운전면허증 등록">{Page}</SimpleBackLayout>;
};
