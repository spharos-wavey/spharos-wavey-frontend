import React, { useState } from "react";
import Image from "next/image";
import RentalTop from "./RentalTop";
import RentalMiddle from "./RentalMiddle";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ModalForm from "@/components/modals/ModalForm";
import { MyRentalCarType, RentalDataType } from "@/types/rentalDataType";
import style from "./RentalWrapper.module.css";
import Separator from "@/components/ui/Separator";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "@/state/authState";
import { carDataType } from "@/types/carDataType";
import Smartkey from "@/components/pages/rental/Smartkey"

export default function RentalWrapper(props: {
  data: carDataType;
}) {
  const router = useRouter();
  const [drawer, setDrawer] = useState<boolean>(false);
  const [nextDrawer, setNextDrawer] = useState<boolean>(false);
  const handleDrawer = () => setDrawer(true);
  const auth = useRecoilValue(authState);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = "Bearer " + auth.token;

  const carData = props.data;
  const frameInfo = props.data?.frameInfo;
  const [ isSmartkeyOpen, setIsSmartkeyOpen ] = useState<boolean>(false);
  console.log(frameInfo, "frameInfo");

  const handleCancel = () => {
    setDrawer(false);
    const rentId = router.query.rentId;
    const getData = async () => {
      const result = await axios.delete(
        `${API_URL}/rental/${rentId}`,
        {
          headers: {
            Authorization: TOKEN,
            uid: auth.uid,
          },
        }
      );
    };
    getData();
  };

  console.log(props.data);
  const charge = props.data.charge;
  
  // const startDate = props.rentData.startDate;
  // const endDate = props.rentData.endDate;
  // const rentData = props.rentData;
  return (
    <main>
      <Smartkey isOpen = {isSmartkeyOpen} setIsOpen={setIsSmartkeyOpen}/>
      {drawer && (
        <Drawer
          open={drawer}
          PaperProps={{
            sx: {
              width: "auto",
              borderTopRightRadius: 18,
              borderTopLeftRadius: 18,
            },
          }}
          anchor="bottom"
          variant="temporary"
        >
          <Box position="relative" width="100%" height="370px">
            <div onClick={() => setDrawer(false)} className={style.closeBtn}>
              <Image
                src="/assets/images/icons/modalCloseX.svg"
                width="20"
                height="20"
                alt="close"
              />
            </div>
            <ModalForm title="대여 취소" />

            <BottomFixedContainer>
              <Button
                btnType={"button"}
                btnEvent={() => handleCancel()}
                shadow={true}
                color={"var(--billita-secondary)"}
                border="1px solid var(--billita-secondary)"
                fontWeight="bold"
                backgroundColor="var(--billita-white)"
              >
                대여 취소하기
              </Button>
            </BottomFixedContainer>
          </Box>
        </Drawer>
      )}
 
      <RentalTop frameInfo={frameInfo} charge={charge} /> 
 
      <RentalMiddle
        frameInfo={frameInfo}
        place={carData.place}
        // startDate={startDate}
        // endDate={endDate}
        // rentData={rentData}
      />
      <Separator gutter={7.5} />
      <BottomFixedContainer>
        <div className={style.twoBtnWrap}>
          <Button
            btnType={"reset"}
            btnEvent={() => setDrawer(true)}
            shadow={true}
            backgroundColor="var(--billita-white)"
            color="var(--billita-secondary)"
            border="1px solid var(--billita-secondary)"
            fontWeight="bold"
          >
            대여취소
          </Button>
          <Button
            btnType={"button"}
            btnEvent={() => setIsSmartkeyOpen(true)}
            shadow={true}
          >
            스마트키
          </Button>
        </div>
      </BottomFixedContainer>
    </main>
  );
}
