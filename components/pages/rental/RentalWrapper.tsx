import React, { useEffect } from "react";
import RentalTop from "./RentalTop";
import RentalMiddle from "./RentalMiddle";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";

export default function RentalWrapper() {
  // useEffect(() => {
  //   const getData = async () => {
  //     const result = await axios.get(`https://api-billita.xyz/rental/`);
  //   };
  //   getData();
  // },[]);
  return (
    <main>
      <RentalTop
        rentalId={undefined}
        carModel={undefined}
        maker={undefined}
        charge={undefined}
        imageUrl={undefined}
      />
      <RentalMiddle
        fare={undefined}
        startTime={undefined}
        endTime={undefined}
        totalRentTime={undefined}
        billitazone={undefined}
        rentalfee={undefined}
        insurancefee={undefined}
      />

      <BottomFixedContainer>
        <Button
          children={`결제하기 5030원`}
          btnType={"button"}
          btnEvent={() => alert("action")}
          shadow={true}
        />
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
