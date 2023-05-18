import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import Separator from "@/components/ui/Separator";
import SectionTitle from "@/components/ui/SectionTitle";
import { licenseType } from "@/types/licenseType";
import { licenseData } from "@/datas/licenseData";

export default function LicenseTop(props: { title: string }) {
  const [level, setLevel] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(event.target.value);
    setSelectedClass("");
  };
  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
  };

  return (
    <>
      <SectionTitle fontSize={0.85}>{props.title}</SectionTitle>
      <Box width="320px">
        <Separator gutter={1} />
        <TextField
          label="면허 구분"
          select
          value={level}
          onChange={handleChange}
          fullWidth
          size="small"
          color="primary"
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
        >
          {licenseData.map((item) => {
            return <MenuItem key={item.classes} value={item.classes}>{item.classes}</MenuItem>;
          })}
        </TextField>

        <Separator gutter={1} />

        <TextField
          label="면허 구분"
          select
          value={selectedClass}
          onChange={handleClassChange}
          fullWidth
          size="small"
          color="primary"
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
        >
          {level === "1종" ? (
            <>
              {licenseData.find((item) => item.classes === "1종")?.categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </>
          ) : (
            <MenuItem value="2종 보통">2종 보통</MenuItem>
          )}
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
          placeholder="YYYY-MM-DD"
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
          placeholder="YYYY-MM-DD"
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
