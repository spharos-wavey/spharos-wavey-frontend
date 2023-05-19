import React, { useState } from "react";
import RentalTop from "./RentalTop";
import RentalMiddle from "./RentalMiddle";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ModalForm from "@/components/modals/ModalForm";
import { rentalDataType } from "@/types/rentalDataType";
import style from "./RentalWrapper.module.css";

export default function RentalWrapper(props: { data: rentalDataType }) {
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
            <ModalForm setDrawer={setDrawer} title="대여 취소" />

            <BottomFixedContainer>
              <Button
                btnType={"button"}
                btnEvent={() => setNextDrawer(true)}
                shadow={true}
              >
                대여 취소하기
              </Button>
            </BottomFixedContainer>
          </Box>
        </Drawer>
      )}

      <RentalTop data={data} />
      <RentalMiddle data={data} />

      <BottomFixedContainer>
        <div className={style.twoBtnWrap}>
          <Button
            btnType={"reset"}
            btnEvent={() => setDrawer(true)}
            shadow={true}
          >
            대여취소 색깔바꿔주세염
          </Button>
          <Button
            btnType={"button"}
            btnEvent={() => alert("action")}
            shadow={true}
          >
            결제하기 5030원
          </Button>
        </div>
      </BottomFixedContainer>
    </main>
  );
}
