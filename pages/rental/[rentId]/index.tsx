import React, { useEffect } from "react";
import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import RentalWrapper from "@/components/pages/rental/RentalWrapper";
import { useRecoilState } from "recoil";
import { authState } from "@/state/authState";
import AuthRecoilChecker from "@/components/util/AuthRecoilChecker";
import { GetServerSideProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import PageLoader from "@/components/ui/PageLoader";

const Detail = (props:{rentId:string}) => {
  
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    if (!auth.auth && AuthRecoilChecker()&&typeof window !== 'undefined') {
      setAuth({
        auth: true, 
        token: localStorage.getItem("token") as string, 
        uid: localStorage.getItem("uid") as string, 
        nickName: localStorage.getItem("nickName") as string,
        email: localStorage.getItem("email") as string,
        profileImageUrl: localStorage.getItem("profileImageUrl") as string,
      });
    }
  }, []);

  if(auth.auth === false) return (
    <main>
      <section>
        <PageLoader text="정보를 불러오고 있습니다."/>
      </section>
    </main>
  )

  return <main> <RentalWrapper rentId={props.rentId}/></main>;
}

Detail.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="대여 내용 상세">{Page}</SimpleBackLayout>;
};

export default Detail;

export const getServerSideProps:GetServerSideProps = async (context:Params) => {

  const {rentId} = context.params;

  return {
    props: {
      rentId: rentId,
    },
  };
}