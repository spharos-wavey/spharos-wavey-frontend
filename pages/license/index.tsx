import React from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import SectionTitle from "@/components/ui/SectionTitle";
import LicenseType from "../../components/pages/license/LicenseTop";
import PersonalInfo from "../../components/pages/license/LicenseBottom";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import LicenseWrapper from "@/components/pages/license/LicenseWrapper";

export default function License() {
  return (
  <main>
    <section>
      <div>
        <LicenseWrapper />
      </div>
      <BottomFixedContainer>
        <Button btnType={"button"} btnEvent={() => alert("g")} shadow={true}>
          등록하기
        </Button>
      </BottomFixedContainer>
    </section>
  </main>
  );
}

License.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="운전면허증 등록">{Page}</SimpleBackLayout>;
};
