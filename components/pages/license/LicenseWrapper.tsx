import React, { useState } from "react";
import LicenseTop from "./LicenseTop";
import LicenseBottom from "./LicenseBottom";

export default function LicenseWrapper() {
  const [topValue, setTopValue] = useState("");
  const [bottomValue, setBottomValue] = useState("");

  const handleTopChange = (value: string) => {
    setTopValue(value);
  };

  const handleBottomChange = (value: string) => {
    setBottomValue(value);
  };

  return (
    <>
      <LicenseTop title="운전면허 정보입력" onChange={handleTopChange} />
      <LicenseBottom title="개인정보 입력" onChange={handleBottomChange} />
    </>
  );
}
