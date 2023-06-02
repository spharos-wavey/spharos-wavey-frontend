import React, { useState } from "react";
import InfoTabItem from "./InfoTabItem";
import style from "./DetailInfo.module.css";
import CarOption from "./CarOption";
import CarManual from "./CarManual";
import CarCommentContainer from "./CarCommentContainer";
import Separator from "@/components/ui/Separator";
import { CarFeatureType } from "@/types/carDataType";

export default function DetailInfo(props : {guide : string, carName : string}) {
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
      <Separator gutter={1} padding={true} />
      {/* {optionView ? <CarOption carFeature={props.carFeature}/> : ""} */}
      {manualView ? <CarManual 
          guide = {props.guide} carName={props.carName} /> : ""}
      {commentView ? <CarCommentContainer /> : ""}
    </>
  );
}
