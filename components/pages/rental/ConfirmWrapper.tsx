import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import RentalTop from "./RentalTop";
import RentalMiddle from "./RentalMiddle";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ModalForm from "@/components/modals/ModalForm";
import { MyRentalCarType, RentalDataType } from "@/types/rentalDataType";
import Separator from "@/components/ui/Separator";
import style from "./ConfirmWrapper.module.css";
import axios from "axios";

export default function ConfirmWrapper(props: { data: RentalDataType }) {
  const data = props.data;
  console.log("자식", data);
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);
  const [nextDrawer, setNextDrawer] = useState(false);
  const [rentCarData, setRentCarData] = useState<MyRentalCarType[]>(
    [] as MyRentalCarType[]
  );
  const userName: string | undefined | null = localStorage.getItem("nickName");
  const PURCHASE_STATE = "RESERVATION";
  const handleDrawer = () => setDrawer(true);
  const handleOffOldOpenNew = () => {
    setDrawer(false);
    setNextDrawer(true);
  };
  const actionToPayAndRedirect = () => {
    alert("결제가 완료되었습니다.");
    router.push("/rentHistory");
  };

  useEffect(() => {
    if (!localStorage.getItem("Authorization") && !localStorage.getItem("uid"))
      return;
    const getData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("Authorization");
        const uid = localStorage.getItem("uid");
        const res = await axios.get(
          `https://api-billita.xyz/rental/${PURCHASE_STATE}`,
          {
            headers: {
              Authorization: token,
              uid: uid,
            },
          }
        );
        const data = res.data;
        setRentCarData(data);
        console.log("ㅇㅇㅇㅇㅇㅇㅇㅇ", data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const rentCarDataLatest = rentCarData[0];
  console.log(rentCarDataLatest);
  const startDate = new Date(rentCarData[0]?.startDate);
  console.log(startDate);
  const endDate = new Date(rentCarData[0]?.endDate)

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
            <div onClick={() => setDrawer(false)} className={style.closeBtn}>
              <Image
                src="/assets/images/icons/modalCloseX.svg"
                width="20"
                height="20"
                alt="close"
              />
            </div>
            <ModalForm title="예약 전, 필수 확인 사항" />

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
            {userName && rentCarData[0] && (
              <ModalForm
                title="예약결제 안내"
                userName={userName}
                startDate={startDate}
                endDate={endDate}
              />
            )}

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
      <RentalMiddle data={data} startDate={startDate} endDate={startDate}/>
      <Separator gutter={7.5} />
      <BottomFixedContainer>
        <Button
          btnType={"button"}
          btnEvent={() => handleDrawer()}
          shadow={true}
        >
          결제하기 {data.frameInfo.defaultPrice.toLocaleString("kr-KO")}원
        </Button>
      </BottomFixedContainer>
    </main>
  );
}
