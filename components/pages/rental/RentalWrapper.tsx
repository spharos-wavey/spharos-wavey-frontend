import React, { useEffect, useState } from "react";
import Image from "next/image";
import RentalTop from "./RentalTop";
import RentalMiddle from "./RentalMiddle";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Button from "@/components/ui/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import ModalForm from "@/components/modals/ModalForm";
import { RentalDetailType } from "@/types/rentalDataType";
import style from "./RentalWrapper.module.css";
import Separator from "@/components/ui/Separator";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "@/state/authState";
import { carDataType } from "@/types/carDataType";
import Swal from "sweetalert2";

export default function RentalWrapper(props: { rentId: string }) {
  const router = useRouter();
  const rentId: string = props.rentId;
  const [drawer, setDrawer] = useState<boolean>(false);
  const [vehicleData, setVehicleData] = useState<carDataType>();
  const auth = useRecoilValue(authState);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const TOKEN = "Bearer " + auth.token;

  const [isSmartkeyOpen, setIsSmartkeyOpen] = useState<boolean>(false);
  const [rentData, setRentData] = useState<RentalDetailType>();

  useEffect(() => {
    const getMyRentalData = async () => {
      const result = await axios.get(`${API_URL}/rental?id=${rentId}`, {
        headers: {
          Authorization: TOKEN,
          uid: auth.uid,
        },
      });

      const myRentalData: RentalDetailType = result.data;
      setRentData(myRentalData);
    };
    getMyRentalData();
  }, [API_URL, TOKEN, auth.uid, rentId]);

  useEffect(() => {
    const getVehicleData = async () => {
      if (rentData !== undefined) {
        const result = await axios.get(
          `${API_URL}/vehicle/${rentData?.vehicleId}`,
          {}
        );
        const v_data: carDataType = result.data;
        setVehicleData(v_data);
      }
    };
    getVehicleData();
  }, [rentData]);

  const frameInfo = vehicleData?.frameInfo;
  const carImage = frameInfo?.image;
  const carName = frameInfo?.carName;
  const carBrand = frameInfo?.carBrand.brandName;
  const battery = vehicleData?.charge;

  const handleClose = () => {
    setDrawer(false);
  };

  const handleCancel = () => {
    setDrawer(false);
    const getCancelRequest = async () => {
      const result = await axios.get(`${API_URL}/rental/cancel/${rentId}`, {
        headers: {
          Authorization: TOKEN,
          uid: auth.uid,
        },
      });
    };
    getCancelRequest();
    Swal.fire({
      title: "대여가 취소되었습니다.",
      confirmButtonText: "확인",
      customClass: {
        container: "mySwal-only-confirm",
        confirmButton: "mySwalConfirmButton",
      },
    }).then(() => {
      router.push("/");
    });
  };

  const handleSmartkeyOpen = () => {
    router.push(`/rental/${rentId}/smartkey`);
  };
  return (
    <main>
      {/* <Smartkey isOpen={isSmartkeyOpen} setIsOpen={setIsSmartkeyOpen} /> */}
      {drawer && (
        <>
          <div
            onClick={handleClose}
            className={
              drawer ? `${style.closeBtn}` : `${style.closeBtn} ${style.close}`
            }
          >
            <Image
              src="/assets/images/icons/modalCloseX.svg"
              width="20"
              height="20"
              alt="close"
            />
          </div>
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
              <ModalForm title="대여 취소" />

              <BottomFixedContainer display="initial">
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
        </>
      )}
      {carImage && carName && carBrand && (
        <RentalTop
          carImage={carImage}
          carName={carName}
          carBrand={carBrand}
          battery={battery}
        />
      )}

      {rentData && <RentalMiddle rentData={rentData} />}
      <Separator gutter={7.5} />
      <BottomFixedContainer justifyContent="center" display="initial">
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
            btnEvent={handleSmartkeyOpen}
            shadow={true}
          >
            스마트키
          </Button>
        </div>
      </BottomFixedContainer>
    </main>
  );
}
