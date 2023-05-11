import React from "react";
import RentalTop from "./RentalTop";
import { rentalDataType } from "@/types/rentalDataType";
import RentalMiddle from "./RentalMiddle";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";

export default function RentalWrapper() {
  return (
    <main>
      <RentalTop />
      <RentalMiddle />
      <BottomFixedContainer>
        <Button
          children={`결제하기 5030원`}
          btnType={"button"}
          btnEvent={() => alert("action")}
          shadow={true}
        />
      </BottomFixedContainer>
    </main>
  );
}
