import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { nowTimeState } from "@/state/nowTime";
import { timeType } from "@/types/rentalDataType";
import style from "./Smartkey.module.css";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BottomFixedContainer from "@/components/layouts/BottomFixedContainer";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@/components/ui/Button";
import ModalForm from "@/components/modals/ModalForm";

export default function Smartkey(props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [drawer, setDrawer] = React.useState(false);
  const reqTime = useRecoilValue<timeType>(nowTimeState);
  const serviceStartTime = new Date(reqTime.startTime);
  const serviceEndTime = new Date(reqTime.endTime);
  const isUserOpenDoor:boolean = Number(serviceStartTime) - Date.now() <= 15 * 60 * 1000;
  const is10MinBeforeReturn:boolean = Number(serviceEndTime) - Date.now() <= 10 * 60 * 1000;
  console.log(serviceEndTime, Number(serviceStartTime), Number(serviceEndTime), isUserOpenDoor, Date.now());
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 158,
    height: 35,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 155,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(120px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 35,
      height: 30,
      borderRadius: 30,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 32 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));
  const handleReturned = () => {
    setDrawer(true);
  }
  const handleGoCheckList = () => {
    setDrawer(false);
    router.push(`/rental/${router.query.rentId}/checklist`);
  }
  return (
    <div
      className={style.over}
      style={props.isOpen ? { display: "block" } : { display: "none" }}
    >

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
                priority
              />
            </div>
            <ModalForm title="반납하기" />

            <BottomFixedContainer display="initial">
              <Button
                btnType={"button"}
                btnEvent={() => handleGoCheckList()}
                shadow={true}
                color={"var(--billita-blueHighlight)"}
                border="1px solid var(--billita-blueHighlight)"
                fontWeight="bold"
                backgroundColor="var(--billita-white)"
              >
                반납하기
              </Button>
            </BottomFixedContainer>
          </Box>
        </Drawer>
      )}
      <div className={style.cover}>
        <div className={style.smartkeyHeader}>
          <div style={{ width: "30px" }}></div>
          <div className={style.headerTitle}>스마트키</div>
          <div
            className={style.smartkeyCloser}
            onClick={() => props.setIsOpen(!props.isOpen)}
          >
            <Image
              src="/assets/images/icons/close.svg"
              width={30}
              height={30}
              alt="closer"
            />
          </div>
        </div>

        <div className={style.carInfoWrap}>
          <div className={style.carBrand}>Tesla</div>
          <div className={style.carName}>Model 3</div>
          <div className={style.carEtc}>
            <div>부산 허 3523</div>
            <div>75%</div>
          </div>
        </div>

        <div>
          <div className={style.carImageWrap}>
            <Image
              src="/assets/images/icons/close.svg"
              width={300}
              height={300}
              alt="smartkey"
            />
          </div>
        </div>

        <div className={style.toggle}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" sx={{ fontSize: 13 }}>
              문닫기
            </Typography>
            <AntSwitch
              defaultChecked
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography variant="body2" sx={{ fontSize: 13 }}>
              문열기
            </Typography>
          </Stack>
        </div>
        
        {isUserOpenDoor && (
        <div className={style.notice}>운행시작 15분 전부터 차량도어 제어 가능</div>
        )}
        {is10MinBeforeReturn && (
        <div className={style.notice}>반납시간 10분 전입니다.</div>
        )}
        <div className={style.notice} onClick={()=>handleReturned()}>반납하기</div>
      </div>
    </div>
  );
}
