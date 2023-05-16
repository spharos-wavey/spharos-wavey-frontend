import React, { useEffect, useState } from "react";
import RentalTop from "./RentalTop";
import RentalMiddle from "./RentalMiddle";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ModalMustRead from "@/components/modals/ModalMustRead";
import ModalActionToPay from "@/components/modals/ModalActionToPay";

export default function RentalWrapper() {
  // useEffect(() => {
  //   const getData = async () => {
  //     const result = await axios.get(`https://api-billita.xyz/rental/`);
  //   };
  //   getData();
  // },[]);

  const [drawer, setDrawer] = useState(false);
  const [nextDrawer, setNextDrawer] = useState(false);

  const handleDrawer = () => setDrawer(true);
  return (
    <main>
      {drawer && (
        <Drawer
          open={drawer}
          PaperProps={{
            sx: {
              width: 390,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
            },
          }}
          anchor="bottom"
          variant="temporary"
        >
          <Box position="relative" width="100%" height="370px">
            <ModalMustRead setDrawer={setDrawer} />

            <BottomFixedContainer>
              <Button
                btnType={"button"}
                btnEvent={() => setNextDrawer(true)}
                shadow={true}
              >
                잘 알겠어요, 예약할게요
              </Button>
            </BottomFixedContainer>
          </Box>
        </Drawer>
      )}

      {nextDrawer && (
        <Drawer
          open={nextDrawer}
          PaperProps={{
            sx: {
              width: 390,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
            },
          }}
          anchor="bottom"
          variant="temporary"
        >
          <Box position="relative" width="100%" height="370px">
            <ModalActionToPay />

            <BottomFixedContainer>
              <Button
                btnType={"button"}
                btnEvent={() => alert("hihi")}
                // 안되는데 히히
                shadow={true}
              >
                잘 알겠어요, 예약할게요
              </Button>
            </BottomFixedContainer>
          </Box>
        </Drawer>
      )}
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
          btnType={"button"}
          btnEvent={() => handleDrawer()}
          shadow={true}
        >
          결제하기 5030원
        </Button>
      </BottomFixedContainer>
    </main>
  );
}
