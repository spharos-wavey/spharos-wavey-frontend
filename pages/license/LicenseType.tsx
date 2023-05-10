import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import Separator from "@/components/ui/Separator";

export default function LicenseType() {
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setType(event.target.value as string);
  // };
  const [type, setType] = useState();

  return (
    <Box width="320px">
      <Separator gutter={1} />

      <TextField
        label="면허증 종류"
        select
        // onChange={handleChange}
        fullWidth
        size="small"
        color="primary"
        variant="standard"
        InputLabelProps={{ style: { fontSize: 12 } }}
      >
        <MenuItem value="01">1종</MenuItem>
        <MenuItem value="02">2종</MenuItem>
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
        <MenuItem value="1-01">1종 대형</MenuItem>
        <MenuItem value="1-02">1종 보통</MenuItem>
        <MenuItem value="1-03">1종 특수</MenuItem>
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
        <MenuItem value="2-01">2종 보통</MenuItem>
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
  );
}
