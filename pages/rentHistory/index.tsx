import React, { useEffect, useState } from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalLogNotExist from "@/components/pages/rental/RentalLogNotExist";

export default function RentHistory() {
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const nickName = localStorage.getItem("nickName");
      if (nickName !== undefined && typeof nickName === "string") {
        setUserName(nickName);
      } else {
        setUserName("빌리타");
      }
      console.log(userName);
    }
  }, [userName]);

  return (
    <main>
        <RentalLogNotExist />

    </main>
  );
}

RentHistory.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="대여 내용 상세">{Page}</SimpleBackLayout>;
};
