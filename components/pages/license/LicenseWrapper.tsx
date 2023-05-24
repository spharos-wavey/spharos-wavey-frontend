import React from "react";
import LicenseTop from "./LicenseTop";
import LicenseBottom from "./LicenseBottom";

export default function LicenseWrapper() {
  return (
    <div>
      <LicenseTop title="운전면허 정보입력" />
      <LicenseBottom title="개인정보 입력"  />
    </div>
  );
}
