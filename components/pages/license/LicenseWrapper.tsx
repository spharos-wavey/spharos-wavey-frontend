import React from "react";
import style from "./LicenseWrapper.module.css";
import LicenseTop from "./LicenseTop";
import LicenseBottom from "./LicenseBottom";
import { licenseData } from "@/datas/licenseData";

export default function LicenseWrapper() {
  return (
    <div className={style.sectionWrap}>
      <LicenseTop title="운전면허 정보입력" />
      <LicenseBottom title="개인정보 입력"  />
    </div>
  );
}
