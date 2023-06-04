import React from "react";
import Image from "next/image";
import style from "./Smartkey.module.css";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Smartkey(props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 158,
    height: 35,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 155,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(120px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 35,
      height: 30,
      borderRadius: 30,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 32 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));
  
  return (
    <div
      className={style.over}
      style={props.isOpen ? { display: "block" } : { display: "none" }}
    >
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
        <Typography variant="body2" sx={{ fontSize: 13 }}>문닫기</Typography>
        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
        <Typography variant="body2" sx={{ fontSize: 13 }}>문열기</Typography>
      </Stack>
      </div>
      </div>
    </div>
  );
}
