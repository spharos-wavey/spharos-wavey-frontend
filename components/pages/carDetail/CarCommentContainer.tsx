import React from "react";
import style from "./CarCommentContainer.module.css";
import CarComment from "./CarComment";

export default function CarCommentContainer() {
  return (
    <div>
      <CarComment
        imgUrl="/assets/images/icons/carWash.png"
        name="홍미소"
        date="2023.05.03 11:22"
        contents="로그인 oAuth 구현해야하는데 넘모 어려워용. 토큰 어떻게하죵?"
      />
    </div>
  );
}
