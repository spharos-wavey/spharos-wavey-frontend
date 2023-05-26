import React, { useState } from "react";
import { Box, TextField, MenuItem, Stack, Button } from "@mui/material";
import SectionTitle from "@/components/ui/SectionTitle";
import Separator from "@/components/ui/Separator";
import { licenseTypeData } from "@/datas/licenseData";

interface LicenseInputType {
  level: string;
  type: string;
  expireDate: string;
  issueDate: string;
  licenseNumber: string;
  address: string;
  addressDetail: string;
  birth: string;
  userName: string;
}

interface LicenseInputErrorType {
  level: string;
  type: string;
  issueDate: string;
  expireDate: string;
  licenseNumber: string;
  address: string;
  addressDetail: string;
  birth: string;
  userName: string;
}

export default function LicenseWrapper() {
  const [level, setLevel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [inputError, setInputError] = useState<LicenseInputErrorType>({
    level: "",
    type: "",
    issueDate: "",
    expireDate: "",
    licenseNumber: "",
    address: "",
    addressDetail: "",
    birth: "",
    userName: "",
  })

  const [touched, setTouched ] = useState(false);

  const [inputData, setInputData] = useState<LicenseInputType>(
    {} as LicenseInputType
  );
  // const [inputError, setInputError] = useState<LicenseInputErrorType>(
  //   {} as LicenseInputErrorType
  // );

  const validateLicenseNumber = (value: string) => {
    const regex = /^\d{2}-\d{6}-\d{2}$/;
    return regex.test(value);
  };

  const validateExpirationDate = (value: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  };

  const validateIssueDate = (value: string) => {
    const regex = /^\d{2}-\d{6}-\d{2}$/;
    return regex.test(value);
  };

  const validateBirth = (value: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  };

  const validateUserName = (value: string) => {
    const regex = /^[가-힣]{2,4}$/;
    return regex.test(value);
  };

  const validateForm = () => {
    const errors = {} as LicenseInputErrorType;

    if (!validateExpirationDate(inputData.expireDate) )  {
      errors.expireDate = "올바른 형식이 아닙니다";
    }
    if (!validateIssueDate(inputData.issueDate)) {
      errors.issueDate = "올바른 형식이 아닙니다";
    }
    if (!validateLicenseNumber(inputData.licenseNumber)) {
      errors.licenseNumber = "올바른 형식이 아닙니다";
    }
    if (!validateBirth(inputData.birth)) {
      errors.birth = "올바른 형식이 아닙니다";
    }
    if (!validateUserName(inputData.userName)) {
      errors.userName = "올바른 형식이 아닙니다";
    }
    return errors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLevel(value);
    setSelectedType("");
    // props.onChange(value);
    console.log(value);
  };
  const handleClassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedClass = event.target.value;
    setSelectedType(selectedClass);
  };

  const validateField = (fieldName: keyof LicenseInputType, value: string) => {
    switch (fieldName) {
      case "expireDate":
        return validateExpirationDate(value) ? "" : "올바른 형식이 아닙니다";
      case "issueDate":
        return validateIssueDate(value) ? "" : "올바른 형식이 아닙니다";
      case "licenseNumber":
        return validateLicenseNumber(value) ? "" : "올바른 형식이 아닙니다";
      case "birth":
        return validateBirth(value) ? "" : "올바른 형식이 아닙니다";
      case "userName":
        return validateUserName(value) ? "" : "올바른 형식이 아닙니다";
      default:
        return "";
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: validateField(name as keyof LicenseInputType, value) }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    console.log(inputData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <SectionTitle fontSize={0.85}>운전면허 정보입력</SectionTitle>
      <Box sx={{ width: "100%" }}>
        <Separator gutter={1} />
        <TextField
          label="면허 구분"
          name="level"
          value={inputData.level}
          select
          onChange={handleChange}
          fullWidth
          size="small"
          color="primary"
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
        >
          {licenseTypeData.map((item) => {
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
          name="type"
          value={inputData.type}
          select
          onChange={handleClassChange}
          fullWidth
          size="small"
          color="primary"
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
        >
          {level === "1종" ? (
            <>
              <MenuItem value="1종 대형">1종 대형</MenuItem>
              <MenuItem value="1종 보통">1종 보통</MenuItem>
              <MenuItem value="1종 특수">1종 특수</MenuItem>

              {/* {licenseTypeData
                .find((item) => item.classes === "1종")
                ?.categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))} */}
            </>
          ) : (
            <MenuItem value="2종 보통">2종 보통</MenuItem>
          )}
        </TextField>
        <Separator gutter={1} />

        <TextField
          label="만료일"
          name="expireDate"
          value={inputData.expireDate}
          variant="standard"
          type="string"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          required
          // onChange={handleExpirationDateChange}
          // error={!validateExpirationDate(expirationDate)}
          helperText={
            !validateExpirationDate(inputData.expireDate)
              ? "올바른 형식이 아닙니다"
              : ""
          }
          placeholder="YYYYMMDD"
        />

        <Separator gutter={1} />

        <TextField
          label="발급일"
          name="issueDate"
          value={inputData.issueDate}
          variant="standard"
          type="number"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          required
          // value={value}
          // onChange={(e) => setValue(e.target.value)}
          helperText={
            !validateIssueDate(inputData.issueDate)
              ? "올바른 형식이 아닙니다"
              : ""
          }
          placeholder="YYYYMMDD"
        />

        <Separator gutter={1} />

        <TextField
          label="면허 번호"
          name="licenseNumber"
          value={inputData.licenseNumber}
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
      <SectionTitle fontSize={0.85}>개인정보 입력</SectionTitle>
      <Box sx={{ width: "100%" }}>
        <Separator gutter={1} />

        <TextField
          label="이름"
          name="userName"
          value={inputData.userName}
          variant="standard"
          type="string"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          placeholder="예: 홍길동"
          // onChange={handleNameChange}
          // error={!isNameValid && touched}
          helperText={
            !validateUserName(inputData.userName)
              ? "이름을 다시 확인해주세요."
              : ""
          }
          required
        />

        <Separator gutter={1} />

        <TextField
          label="주소입력"
          name="address"
          value={inputData.address}
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="예: 부산시 해운대구 APEC로 17"
        />
        <Separator gutter={1} />

        <TextField
          label="상세주소"
          name="addressDetail"
          value={inputData.addressDetail}
          variant="standard"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="예: 리더스마크 4층 스파로스 아카데미"
        />
        <Separator gutter={1} />

        <TextField
          label="생년월일"
          name="birth"
          value={inputData.birth}
          variant="standard"
          type="number"
          InputLabelProps={{ style: { fontSize: 12 } }}
          fullWidth
          // helperText={value ? "" : "필수 입력창 입니다."}
          placeholder="예: YYYYYMMDD"
          helperText={
            !validateBirth(inputData.birth) ? "올바른 형식이 아닙니다" : ""
          }
          required
        />
        <Separator gutter={7} />
      </Box>
      <button>등록하기</button>
    </form>
  );
}
