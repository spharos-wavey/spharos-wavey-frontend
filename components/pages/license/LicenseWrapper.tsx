import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Stack,
  Button,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  FormGroup,
  Input,
  FormHelperText,
} from "@mui/material";
import SectionTitle from "@/components/ui/SectionTitle";
import Separator from "@/components/ui/Separator";
import { LicenseInputType } from "@/types/licenseType";
import { useRouter } from "next/router";
import { Co2Sharp } from "@mui/icons-material";
import Swal from "sweetalert2";
export default function LicenseWrapper() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("Authorization")
        ? setToken(localStorage.getItem("Authorization"))
        : router.push("/login");
      return;
    }
  }, []);

  const [inputError, setInputError] = useState<LicenseInputType>({
    level: "",
    type: "",
    issueDate: "",
    expireDate: "",
    licenseNumber: "",
    address: "",
    addressDetail: "",
    birth: "",
    userName: "",
  });

  const [inputData, setInputData] = useState<LicenseInputType>({
    level: "1종",
    type: "",
    issueDate: "",
    expireDate: "",
    licenseNumber: "",
    address: "",
    addressDetail: "",
    birth: "",
    userName: "",
  });

  const validateLicenseNumber = (value: string) => {
    const regex = /^\d{2}-\d{2}-\d{6}-\d{2}$/;
    return regex.test(value);
  };

  const validateExpirationDate = (value: string) => {
    const regex = /^\d{4}.\d{2}.\d{2}$/;
    return regex.test(value);
  };

  const validateIssueDate = (value: string) => {
    const regex = /^\d{4}.\d{2}.\d{2}$/;
    return regex.test(value);
  };

  const validateBirth = (value: string) => {
    const regex = /^\d{4}.\d{2}.\d{2}$/;
    return regex.test(value);
  };

  const validateUserName = (value: string) => {
    const regex = /^[가-힣]{2,4}$/;
    return regex.test(value);
  };

  const validateForm = () => {
    const errors = {} as LicenseInputType;

    if (!validateExpirationDate(inputData.expireDate)) {
      errors.expireDate = "올바른 형식이 아닙니다";
    } else {
      errors.expireDate = "";
    }
    if (!validateIssueDate(inputData.issueDate)) {
      errors.issueDate = "올바른 형식이 아닙니다";
    } else {
      errors.issueDate = "";
    }
    if (!validateLicenseNumber(inputData.licenseNumber)) {
      errors.licenseNumber = "올바른 형식이 아닙니다";
    } else {
      errors.licenseNumber = "";
    }
    if (!validateBirth(inputData.birth)) {
      errors.birth = "올바른 형식이 아닙니다";
    } else {
      errors.birth = "";
    }
    if (!validateUserName(inputData.userName)) {
      errors.userName = "올바른 형식이 아닙니다";
    } else {
      errors.userName = "";
    }
    return errors;
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

    if (name === "birth") {
      const formattedValue = value.replace(/\D/g, "");
      let formattedInput = formattedValue;

      if (formattedValue.length >= 4) {
        const year = formattedValue.slice(0, 4);
        const month = formattedValue.slice(4, 6);
        const day = formattedValue.slice(6, 8);
        formattedInput = `${year}.${month}.${day}`;
      }

      setInputData((prev) => ({
        ...prev,
        [name]: formattedInput,
      }));
      setInputError((prev) => ({
        ...prev,
        [name]: validateField(name as keyof LicenseInputType, formattedInput),
      }));
      return;
    }
    setInputData((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({
      ...prev,
      [name]: validateField(name as keyof LicenseInputType, value),
    }));
  };

  const handlSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIncorrectLicense = () => {
    Swal.fire({
      text: "면허정보를 다시 확인하세요.",
      icon: "error",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
  };

  const handleFormSubmit = () => {
    const errors = validateForm();
    console.log(errors);

    const postData = async () => {
      const token = "Bearer " + localStorage.getItem("Authorization");
      await fetch("https://api-billita.xyz/booklist/check/license", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          level: inputData.level,
          type: inputData.type,
          expireDate: inputData.expireDate,
          issueDate: inputData.issueDate,
          licenseNumber: inputData.licenseNumber,
          address: inputData.address,
          addressDetail: inputData.addressDetail,
          birth: inputData.birth,
          userName: inputData.userName,
        }),
      })
        .then((res) => {
          console.log(res.status, res.ok);
          if (res.status === 200) {
            console.log("ok");

            router.push(`/car/${router.query.cid}/book`);
          } else {
            console.log("not ok");
            handleIncorrectLicense();
          }
        })
        .catch((err) => console.log(err));
    };
    postData();
  };

  return (
    <section>
      <FormGroup>
        <SectionTitle fontSize={0.85}>운전면허 정보입력</SectionTitle>
        <Separator gutter={1} />
        <Box sx={{ width: "100%" }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              면허종류
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="level"
              value={inputData.level}
              label="면허종류"
              onChange={handlSelectChange}
            >
              <MenuItem value="1종">1종</MenuItem>
              <MenuItem value="2종">2종</MenuItem>
            </Select>
          </FormControl>

          <Separator gutter={1} />

          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              면허구분
            </InputLabel>

            {inputData.level === "1종" ? (
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={inputData.type}
                label="면허구분"
                name="type"
                onChange={handlSelectChange}
              >
                <MenuItem value="1종보통">1종보통</MenuItem>
                <MenuItem value="1종대형">1종대형</MenuItem>
                <MenuItem value="1종특수">1종특수</MenuItem>
              </Select>
            ) : (
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={inputData.type}
                label="면허구분"
                name="type"
                onChange={handlSelectChange}
              >
                <MenuItem value="2종보통">2종보통</MenuItem>
              </Select>
            )}
          </FormControl>
          <Separator gutter={1} />
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="expireDate">만료일</InputLabel>
            <Input
              id="expireDate"
              name="expireDate"
              value={inputData.expireDate}
              onChange={handleInputChange}
              error={!inputError.expireDate}
              aria-describedby="expireDate-helper-text"
            />
            <FormHelperText id="licenseNumber-helper-text">
              {inputError.expireDate}
            </FormHelperText>
          </FormControl>
          <Separator gutter={1} />
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="issueDate">발급일</InputLabel>
            <Input
              id="issueDate"
              name="issueDate"
              value={inputData.issueDate}
              onChange={handleInputChange}
              error={!inputError.issueDate}
              aria-describedby="issueDate-helper-text"
            />
            <FormHelperText id="issueDate-helper-text">
              {inputError.issueDate}
            </FormHelperText>
          </FormControl>
          <Separator gutter={1} />
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="licenseNumber">면허번호</InputLabel>
            <Input
              id="licenseNumber"
              name="licenseNumber"
              value={inputData.licenseNumber}
              onChange={handleInputChange}
              error={!inputError.licenseNumber}
              aria-describedby="licenseNumber-helper-text"
            />
            <FormHelperText id="licenseNumber-helper-text">
              {inputError.licenseNumber}
            </FormHelperText>
          </FormControl>
          <Separator gutter={5} />

          <SectionTitle fontSize={0.85}>개인정보입력</SectionTitle>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="userName">이름</InputLabel>
            <Input
              id="userName"
              name="userName"
              value={inputData.userName}
              onChange={handleInputChange}
              error={!inputError.userName}
              aria-describedby="userName-helper-text"
            />
            <FormHelperText id="userName-helper-text">
              {inputError.userName}
            </FormHelperText>
          </FormControl>
          <Separator gutter={1} />
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="birth">생년월일</InputLabel>
            <Input
              id="birth"
              name="birth"
              value={inputData.birth}
              onChange={handleInputChange}
              error={!inputError.birth}
              aria-describedby="birth-helper-text"
            />
            <FormHelperText id="birth-helper-text">
              {inputError.birth}
            </FormHelperText>
          </FormControl>
          <Separator gutter={1} />

          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="address">주소</InputLabel>
            <Input
              id="address"
              name="address"
              value={inputData.address}
              onChange={handleInputChange}
              error={!inputError.address}
              aria-describedby="address-helper-text"
            />
            <FormHelperText id="address-helper-text">
              {inputError.address}
            </FormHelperText>
          </FormControl>
          <Separator gutter={1} />
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="addressDetail">상세주소</InputLabel>
            <Input
              id="addressDetail"
              name="addressDetail"
              value={inputData.addressDetail}
              onChange={handleInputChange}
              error={!inputError.addressDetail}
              aria-describedby="addressDetail-helper-text"
            />
            <FormHelperText id="addressDetail-helper-text">
              {inputError.addressDetail}
            </FormHelperText>
          </FormControl>
          <Separator gutter={5} />
        </Box>
        <Button
          type="button"
          variant="contained"
          sx={{ width: "100%" }}
          onClick={handleFormSubmit}
        >
          다음
        </Button>
      </FormGroup>
    </section>
  );
}
