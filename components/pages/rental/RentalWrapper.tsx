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

export default function RentalWrapper(props: {
  data: RentalDataType;
  rentData: MyRentalCarType;
}) {
  const { place } = props.data;
  console.log("props.data", props.data);
  // const bookId = props.rentId;
  const router = useRouter();
  const [drawer, setDrawer] = useState<boolean>(false);
  const [nextDrawer, setNextDrawer] = useState<boolean>(false);
  const handleDrawer = () => setDrawer(true);

  const handleCancel = () => {
    setDrawer(false);
    const bookId = router.query.bookId;
    console.log("bookId", bookId);
    const getData = async () => {
      const result = await axios.delete(
        `https://api-billita.xyz/rental/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            uid: localStorage.getItem("uid"),
          },
        }
      );
      console.log("data : ", result.data);
      console.log("img url : ", result.data.frameInfo.image);
    };
    getData();
  };
  const charge = props.data.charge;
  const startDate = props.rentData.startDate;
  const endDate = props.rentData.endDate;
  const rentData = props.rentData;
  return (
    <main>
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
 
      <RentalTop data={props.data.frameInfo} charge={charge} />  : <></>
 
      <RentalMiddle
        data={props.data.frameInfo}
        place={place}
        startDate={startDate}
        endDate={endDate}
        rentData={rentData}
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
            btnEvent={() => alert("action")}
            shadow={true}
          >
            스마트키
          </Button>
        </div>
      </BottomFixedContainer>
    </main>
  );
}
