import React, { useState } from "react";
import BottomFixedContainer from "../layouts/BottomFixedContainer";
import Button from "../ui/Button";
import style from "./TimeSelectModal.module.css";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function TimeSelect() {
  const [timeMuiActive, setTimeMuiActive] = useState(false);

  const timeMuiHandler = () => {
    setTimeMuiActive(true);
  };

  return timeMuiActive === true ? (
    <BottomFixedContainer backgroundColor="transparent">
      <DatePicker />
    </BottomFixedContainer>
  ) : (
    <>
      <BottomFixedContainer backgroundColor="white">
        <div>시간을 선택해 주세요.</div>
        <div style={{ display: "flex", gap: "15px", padding: "0px 30px" }}>
          <Button btnType="button" btnEvent={timeMuiHandler}>
            시간 선택
          </Button>
          <Button
            btnType="button"
            submitType="cancel"
            btnEvent={() => alert("시간 선택")}
          >
            취소
          </Button>
        </div>
      </BottomFixedContainer>
    </>
  );
}
