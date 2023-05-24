import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import RentalTop from "./RentalTop";
import RentalMiddle from "./RentalMiddle";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ModalForm from "@/components/modals/ModalForm";
import { RentalDataType } from "@/types/rentalDataType";
import Separator from "@/components/ui/Separator";
import style from "./ConfirmWrapper.module.css"

export default function ConfirmWrapper(props: { data: RentalDataType }) {
  const data = props.data;
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);
  const [nextDrawer, setNextDrawer] = useState(false);
  const handleDrawer = () => setDrawer(true);
  const handleOffOldOpenNew = () => {
    setDrawer(false);
    setNextDrawer(true);
  };
  const actionToPayAndRedirect = () => {
    alert("결제가 완료되었습니다.")
    router.push("/rentHistory");
  }
  return (
    <main>
      {drawer && (
        <Drawer
          open={drawer}
          PaperProps={{
            sx: {
              width: 375,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
            },
          }}
          anchor="bottom"
          variant="temporary"
        >
          <Box position="relative" width="100%" height="370px">
            <div
              onClick={() => setDrawer(false)}
              className={style.closeBtn}
            >
              <Image
                src="/assets/images/icons/modalCloseX.svg"
                width="20"
                height="20"
                alt="close"
              />
            </div>
            <ModalForm setDrawer={setDrawer} title="예약 전, 필수 확인 사항" />

            <BottomFixedContainer>
              <Button
                btnType={"button"}
                btnEvent={() => handleOffOldOpenNew()}
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
              width: 375,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
            },
          }}
          anchor="bottom"
          variant="temporary"
        >
          <Box position="relative" width="100%" height="370px">
            <div
              onClick={() => setNextDrawer(false)}
              className={style.closeBtn}
            >
              <Image
                src="/assets/images/icons/modalCloseX.svg"
                width="20"
                height="20"
                alt="close"
              />
            </div>
            <ModalForm setDrawer={setDrawer} title="예약결제 안내" />

            <BottomFixedContainer>
              <Button
                btnType={"button"}
                btnEvent={() => actionToPayAndRedirect()}
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
      <Separator gutter={7.5} />
      <BottomFixedContainer>
        <Button
          btnType={"button"}
          btnEvent={() => handleDrawer()}
          shadow={true}
        >
          결제하기 {props.data.defaultPrice.toLocaleString("kr-KO")}원
        </Button>
      </BottomFixedContainer>
    </main>
  );
}
