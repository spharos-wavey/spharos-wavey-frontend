import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import Separator from "@/components/ui/Separator";
import SectionTitle from "@/components/ui/SectionTitle";
import { licenseType } from "@/types/licenseType";
import { licenseData } from "@/datas/licenseData";

export default function LicenseTop(props: {
  title: string;
  license: licenseType;
}) {
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setType(event.target.value as string);
  // };
  const [value, setValue] = useState("");
  console.log(props.license);
  return (
    <>
      <SectionTitle fontSize={0.85}>{props.title}</SectionTitle>
      <Box width="320px">
        <Separator gutter={1} />

        <TextField
          label="면허 구분"
          select
          // onChange={handleChange}
          fullWidth
          size="small"
          color="primary"
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
        >
          <MenuItem value={props.license.classes == "1종" ? undefined : "1종"}>1종</MenuItem>
          <MenuItem value={props.license.classes == "2종" ? undefined : "2종"}>2종</MenuItem>
        </TextField>

        <Separator gutter={1} />

        <TextField
          label="면허 구분"
          select
          // onChange={handleChange}
          fullWidth
          size="small"
          color="primary"
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
        >
          <MenuItem value={props.license.categories[0]}>1종 대형</MenuItem>
          <MenuItem value={props.license.categories[1]}>1종 보통</MenuItem>
          <MenuItem value={props.license.categories[2]}>1종 특수</MenuItem>
        </TextField>
        <Separator gutter={1} />

        <TextField
          label="면허 구분"
          select
          // onChange={handleChange}
          fullWidth
          size="small"
          color="primary"
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
        >
          <MenuItem value="2종 보통">2종 보통</MenuItem>
        </TextField>
        <Separator gutter={1} />

        <TextField
          label="만료일"
          variant="standard"
          type="number"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          required
          // onChange={(e) => setValue(e.target.value)}
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="00-000000-00"
        />

        <Separator gutter={1} />

        <TextField
          label="발급일"
          variant="standard"
          type="number"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          required
          // value={value}
          // onChange={(e) => setValue(e.target.value)}
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="00-000000-00"
        />

        <Separator gutter={1} />

        <TextField
          label="면허 번호"
          variant="standard"
          type="number"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          required
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="00-000000-00"
        />

        <Separator gutter={3} />
      </Box>
    </>
  );
}
