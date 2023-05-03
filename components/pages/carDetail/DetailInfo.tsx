import React, { useEffect, useState } from "react";
import InfoTabItem from "./InfoTabItem";
import style from "./DetailInfo.module.css";
import CarOption from "./CarOption";
import CarManual from "./CarManual";
import CarComment from "./CarComment";

export default function DetailInfo() {
  const [optionView, setOptionView] = useState(true);
  const [manualView, setManualView] = useState(false);
  const [commentView, setCommentView] = useState(false);

  const optionHandler = () => {
    setOptionView(!optionView);
    setManualView(false);
    setCommentView(false);
  };

  const manualHandler = () => {
    setManualView(!manualView);
    setOptionView(false);
    setCommentView(false);
  };

  const commentHandler = () => {
    setCommentView(!commentView);
    setOptionView(false);
    setManualView(false);
  };

  return (
    <>
      <div className={style.tab}>
        <InfoTabItem
          name="옵션정보"
          isActive={optionView}
          btnEvent={optionHandler}
        />
        <InfoTabItem
          name="이용방법"
          isActive={manualView}
          btnEvent={manualHandler}
        />
        <InfoTabItem
          name="댓글"
          isActive={commentView}
          btnEvent={commentHandler}
        />
      </div>
      {optionView ? <CarOption /> : ""}
      {manualView ? <CarManual /> : ""}
      {commentView ? <CarComment /> : ""}
    </>
  );
}
