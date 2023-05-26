import React, { useState } from "react";
import { Box, TextField, MenuItem, Stack } from "@mui/material";
import Separator from "@/components/ui/Separator";
import SectionTitle from "@/components/ui/SectionTitle";
import { licenseType } from "@/types/licenseType";

export default function PersonalInfo(props: { title: string; onChange: (value: string) => void  }) {
  const [userName, setUserName] = useState("");
  const [touched, setTouched] = useState(false);

  const validateUserName = (value: string) => {
    const regex = /^[가-힣]{2,4}$/;
    return regex.test(value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if(validateUserName(value)){
    setUserName(value);
  }
}
  const handleNameBlur = () => {
    setTouched(true);
  }

  const isNameValid = validateUserName(userName) || !touched;

  return (
    <>
      <SectionTitle fontSize={0.85}>{props.title}</SectionTitle>
      <Box width="320px">
        <Separator gutter={1} />

        <TextField
          label="이름"
          variant="standard"
          type="string"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          placeholder="예: 홍길동"
          onChange = {handleNameChange}
          error={!isNameValid && touched}
          helperText={!isNameValid && touched ? "필수입력란입니다" : ""}
          required
        />

        <Separator gutter={1} />

        <TextField
          label="주소입력"
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="예: 부산시 해운대구 APEC로 17"
        />
        <Separator gutter={1} />

        <TextField
          label="상세주소"
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="예: 리더스마크 4층 스파로스 아카데미"
        />
        <Separator gutter={1} />

        <TextField
          label="생년월일"
          variant="standard"
          type="number"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="예: YYYYYMMDD"
          required
        />
        <Separator gutter={7} />
      </Box>
    </>
  );
}
