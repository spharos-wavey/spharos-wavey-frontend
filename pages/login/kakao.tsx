import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import api from "./axios";

const kakao = () => {
  const router = useRouter();
  const code = router.query.code;
  const GRANT_TYPE = "authorization_code";
  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/login/kakao`;

  useEffect(() => {
    if (code != undefined) {
      console.log(code);
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${code}`,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        )
        .then((res) => {
          console.log(`res: ${res}`);
          window.Kakao.Auth.setAccessToken(res.data.access_token);
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: function (response: any) {
              console.log(response);
            },
            fail: function (error: any) {
              console.log(error);
            },
          });
          api
            .post("auth/kakao", {
              accessToken: res.data.acess_token,
            })
            .then((res) => {
              console.log(res);
            });
        });
    }
  });
  return <div>로그인함수</div>;
};

export default kakao;
