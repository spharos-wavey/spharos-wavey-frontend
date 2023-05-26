import React, { useState } from "react";
import { Box, TextField, MenuItem, Stack } from "@mui/material";
import SectionTitle from "@/components/ui/SectionTitle";
import Separator from "@/components/ui/Separator";

export interface LicenseInputType {
  id: string;
  level: string;
  type: string;

}

export default function LicenseWrapper() {
  const [topValue, setTopValue] = useState("");
  const [bottomValue, setBottomValue] = useState("");

  const [inputData, setInputData] = useState<LicenseInputType>({} as LicenseInputType);

  const handleTopChange = (value: string) => {
    setTopValue(value);
  };

  const handleBottomChange = (value: string) => {
    setBottomValue(value);
  };

  return (
    <form onSubmit={handleFormSubmit} action="https://api-billita.xyz/carLicense" method="post">
      <SectionTitle fontSize={0.85}>{props.title}</SectionTitle>
      <Box width="320px">
        <Separator gutter={1} />
        <TextField
          label="면허 구분"
          select
          name="level"
          value={inputData.level}
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
          onChange={handleNameChange}
          error={!isNameValid && touched}
          helperText={!isNameValid && touched ? "필수입력란입니다" : ""}
          required
        />

        {/* <div className={style.boxing}>
          <input type="text" name="userName" className={style.nameInput}/>
          <label className={style.label}>이름</label>
        </div> */}

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
      <Button
        btnType={"submit"}
        btnEvent={() => handleRegister()}
        shadow={true}
        width={320}
      >
        등록하기
      </Button>
    </form>
  );
}
