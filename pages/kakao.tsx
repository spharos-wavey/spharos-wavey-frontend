import { useRouter } from "next/router";
import { useEffect } from "react";
import qs from "qs";
import axios from "axios";
import { Box, Stack, CircularProgress } from "@mui/material";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/state/authState";
import { redirectionUrlState } from "@/state/redirectionState";

export default function Kakao() {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;
  const [auth, setAuth] = useRecoilState(authState);

  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/kakao`;
  const NEXT_PUBLIC_KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  //const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {

    if(typeof window !== undefined) {
      const redirectUrl = sessionStorage.getItem("redirectUrl");
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

        const data = await res.json();
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
          localStorage.setItem("nickName", data.properties.nickname);
          console.log(data)
          try {
            
            axios
              .post(`${API_URL}/auth/login`, {
                email: data.kakao_account.email,
                nickName: data.properties.nickname,
                profileImageUrl: data.properties.profile_image,
              })
              .then((res) => {
                const jwtToken = res.headers.authorization;
                localStorage.setItem("Authorization", jwtToken);
                localStorage.setItem("uid", res.headers.uid);
                localStorage.setItem("nickName", data.properties.nickname);
                localStorage.setItem("profileImageUrl", data.properties.profile_image);
                localStorage.setItem("email", data.kakao_account.email);
                console.log(data.properties.nickname);
                console.log(data.properties.profile_image);
                console.log(data.kakao_account.email);
                setAuth({
                  auth: true,
                  nickName: data.properties.nickname,
                  profileImageUrl: data.properties.profile_image,
                  token: jwtToken,
                  uid: res.headers.uid,
                  email: data.kakao_account.email,
                });
                if( redirectUrl !== null || redirectUrl !== undefined || redirectUrl !== "" ) {
                  router.push(redirectUrl as string);
                } else {
                  router.push("/");
                }
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
    }
  }, [authCode, CLIENT_ID, REDIRECT_URI, REST_API_KEY, router, setAuth]);

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
