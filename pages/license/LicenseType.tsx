import React, { useState } from "react";
import { Box, TextField, MenuItem, Stack } from "@mui/material";
import Separator from "@/components/ui/Separator";

export default function LicenseType() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value as string);
  };
  return (
    <Box width="320px">
      <Separator gutter={1} />

      <TextField
        label="면허증 종류"
        select
        value={type}
        onChange={handleChange}
        fullWidth
        size="small"
        color="primary"
        variant="standard"
        InputLabelProps={{ style: { fontSize: 12 } }}
      >
        <MenuItem value="t1">1종</MenuItem>
        <MenuItem value="t2">2종</MenuItem>
      </TextField>

      <Separator gutter={1} />

      <TextField
        label="면허 구분"
        select
        value={type}
        onChange={handleChange}
        fullWidth
        size="small"
        color="primary"
        variant="standard"
        InputLabelProps={{ style: { fontSize: 12 } }}
      >
        <MenuItem value="t1">1종</MenuItem>
        <MenuItem value="t2">2종</MenuItem>
      </TextField>
      <Separator gutter={1} />

      <TextField
        label="면허 구분"
        select
        value={type}
        onChange={handleChange}
        fullWidth
        size="small"
        color="primary"
        variant="standard"
        InputLabelProps={{ style: { fontSize: 12 } }}
      ></TextField>

      <Separator gutter={1} />

      <Stack spacing={4}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="면허 번호"
            variant="standard"
            type="number"
            InputLabelProps={{ style: { fontSize: 12 } }}
            fullWidth
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            // helperText={value ? "" : "필수 입력창 입니다."}
            placeholder="00-000000-00"
          />
        </Stack>
      </Stack>
    </Box>
  );
}
