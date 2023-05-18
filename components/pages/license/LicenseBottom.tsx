import React from "react";
import { Box, TextField, MenuItem, Stack } from "@mui/material";
import Separator from "@/components/ui/Separator";
import SectionTitle from "@/components/ui/SectionTitle";
import { licenseType } from "@/types/licenseType";

export default function PersonalInfo(props: { title: string }) {
  return (
    <>
      <SectionTitle fontSize={0.85}>{props.title}</SectionTitle>
      <Box width="320px">
        <Separator gutter={1} />

        <TextField
          label="이름"
          variant="standard"
          type="name"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="예: 홍길동"
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
        />
        <Separator gutter={7} />
      </Box>
    </>
  );
}
