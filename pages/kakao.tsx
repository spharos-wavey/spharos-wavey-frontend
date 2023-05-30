import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import qs from "qs";
import axios from "axios";
import { Box, Stack, CircularProgress } from "@mui/material";
import React from "react";

interface ResponseType {
  ok: boolean;
  error?: any;
}

interface loginDataType {
  email: String;
  nickName: String;
  profileImageUrl: String;
}

const Kakao: NextPage = () => {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/kakao`;
  const NEXT_PUBLIC_KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  //const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    // if (!window.Kakao.isInitialized()) {
    //   window.Kakao.init(NEXT_PUBLIC_KAKAO_JS_KEY);
    //   console.log(window.Kakao.isInitialized);
    //   console.log(window.Kakao.Auth);
    // }
    const getToken = async () => {
      const payload = qs.stringify({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authCode,
        client_secret: CLIENT_ID,
      });

      try {
        const res = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          body: payload,
        });

        console.log(res);
        const data = await res.json();
        console.log(data.access_token);
        localStorage.setItem("token", data.access_token);

        try {
          const res = await fetch("https://kapi.kakao.com/v2/user/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await res.json();
          console.log(data);
          localStorage.setItem("nickName", data.properties.nickname);

          const postData: loginDataType = {
            email: data.kakao_account.email,
            nickName: data.properties.nickname,
            profileImageUrl: data.properties.profile_image,
          };

          // setUserEmail(data.email);
          // setNickName(data.properties.nickname);

          try {
            // const res = await fetch("https://api-billita.xyz/auth/login", {
            //   method: "POST",
            //   body: JSON.stringify({
            //     email: data.kakao_account.email,
            //     nickName: data.properties.nickname,
            //     profileImageUrl: data.properties.profile_image,
            //   }),
            // });
            axios
              .post("https://api-billita.xyz/auth/login", {
                email: data.kakao_account.email,
                nickName: data.properties.nickname,
                profileImageUrl: data.properties.profile_image,
              })
              .then((res) => {
                const jwtToken = res.headers.authorization;
                localStorage.setItem("Authorization", jwtToken);
                localStorage.setItem("uid", res.headers.uid);

                sessionStorage.getItem("carDetail")
                  ? router.push(sessionStorage.getItem("carDetail") as string)
                  : router.push("/");
              })
              .catch((err) => router.push("/login"));
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  }, [authCode, CLIENT_ID, REDIRECT_URI, REST_API_KEY, router]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Stack spacing={2}>
        <CircularProgress color="primary" />
      </Stack>
    </Box>
  );
};

export default Kakao;
