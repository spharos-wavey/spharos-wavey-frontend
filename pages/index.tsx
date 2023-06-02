import EventBanner from "@/components/pages/main/EventBanner";
import Layout from "@/components/layouts/layout";
import LogoMainPage from "@/components/ui/Logo";
import BrandSort from "@/components/pages/main/brandsortSection/BrandSort";
import VehicleRecommendMain from "@/components/pages/main/vehicleRecommendSection/VehicleRecommendMain";
import Separator from "@/components/ui/Separator";
import { brandSortType } from "@/types/brandSortType";
import { useRecoilState } from "recoil";
import { authState } from "@/state/authState";
import AuthRecoilChecker from "@/components/util/AuthRecoilChecker";
import { useEffect } from "react";

function Page(props: { data: brandSortType[]; }) {

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
  
  return (
    <main>
      <LogoMainPage />
      <BrandSort data={props.data}/>
      <VehicleRecommendMain />
      <Separator gutter={20} />
      <EventBanner />
    </main>
  );
}

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return (
    <Layout>{Page}</Layout>
  );
};

export default Page;

export const getStaticProps = async () => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/carbrand`);
  if(res.status !== 200) {
    return {
      notFound: true,
    };
  }
  const data = await res.json();

  return {
    props: {
      data : data,
    },
  };
}
