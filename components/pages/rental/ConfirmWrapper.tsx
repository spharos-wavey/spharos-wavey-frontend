import React, { useState } from "react";
import RentalTop from "./RentalTop";
import RentalMiddle from "./RentalMiddle";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ModalForm from "@/components/modals/ModalForm";
import { rentalDataType } from "@/types/rentalDataType";

export default function ConfirmWrapper(props: { data: rentalDataType }) {
  const data = props.data;
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
            <ModalForm setDrawer={setDrawer} title="예약 전, 필수 확인 사항" />

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
            <ModalForm setDrawer={setDrawer} title="예약결제 안내" />

            <BottomFixedContainer>
              <Button
                btnType={"button"}
                btnEvent={() => alert("hihi")}
                shadow={true}
              >
                잘 알겠어요, 예약할게요
              </Button>
            </BottomFixedContainer>
          </Box>
        </Drawer>
      )}
      <RentalTop data={data} />
      <RentalMiddle data={data} />

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
