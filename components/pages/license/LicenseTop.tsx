import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import Separator from "@/components/ui/Separator";
import SectionTitle from "@/components/ui/SectionTitle";
import { licenseType } from "@/types/licenseType";
import { licenseData } from "@/datas/licenseData";

export default function LicenseTop(props: {
  title: string;
  onChange: (value: string) => void;
}) {
  const [level, setLevel] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLevel(value);
    setSelectedClass("");
    props.onChange(value);
    console.log(value);
  };
  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);
  };

  const validateExpirationDate = (value: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  };

  const handleExpirationDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const expirationDate = event.target.value;
    if (validateExpirationDate(expirationDate)) {
      setExpirationDate(expirationDate);
    }
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
            return (
              <MenuItem key={item.classes} value={item.classes}>
                {item.classes}
              </MenuItem>
            );
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
              {licenseData
                .find((item) => item.classes === "1종")
                ?.categories.map((category) => (
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
          type="string"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          required
          onChange={handleExpirationDateChange}
          // error={!validateExpirationDate(expirationDate)}
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="YYYYMMDD"
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
          placeholder="YYYYMMDD"
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
          placeholder="00-000000-00 숫자만 입력하세요"
        />
        <Separator gutter={3} />
      </Box>
    </>
  );
}
