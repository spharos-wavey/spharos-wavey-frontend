import EventBanner from "@/components/pages/main/EventBanner";
import Layout from "@/components/layouts/layout";
import BrandSort from "@/components/pages/main/brandsortSection/BrandSort";
import VehicleRecommendMain from "@/components/pages/main/vehicleRecommendSection/VehicleRecommendMain";
import Separator from "@/components/ui/Separator";
import { brandSortType } from "@/types/brandSortType";
import { useRecoilState } from "recoil";
import { authState } from "@/state/authState";
import AuthRecoilChecker from "@/components/util/AuthRecoilChecker";
import { useEffect } from "react";
import Swal from "sweetalert2";
import requestLocationPermission from "@/components/util/requestLocationPermission";
import BlogList from "@/components/pages/main/blog/BlogList";

function Page(props: { data: brandSortType[] }) {
  useEffect(() => {
    const handleGeolocationError = (error: GeolocationPositionError) => {
      Swal.fire({
        text: "위치공유 허용 시에만 원활한 서비스 이용이 가능합니다.",
        toast: true,
        position: "top",
        showConfirmButton: true,
        confirmButtonText: "확인",
        timer: 5000,
        timerProgressBar: false,
        customClass: {
          container: "mySwal-only-confirm",
          confirmButton: "mySwalConfirmButtonOnly",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // requestLocationPermission();
        }
      });
    };

    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {}, // Success callback
        handleGeolocationError // Error callback
      );
    }
  }, []);

  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    if (!auth.auth && AuthRecoilChecker() && typeof window !== "undefined") {
      setAuth({
        auth: true,
        token: localStorage.getItem("token") as string,
        uid: localStorage.getItem("uid") as string,
        nickName: localStorage.getItem("nickName") as string,
        email: localStorage.getItem("email") as string,
        profileImageUrl: localStorage.getItem("profileImageUrl") as string,
      });
    }
  }, [auth.auth, setAuth]);

  useEffect(() => {
    if (typeof window !== undefined) {
      sessionStorage.removeItem("redirectUrl");
      sessionStorage.removeItem("startTime");
      sessionStorage.removeItem("endTime");
    }
  }, []);

  return (
    <main>
      <BrandSort data={props.data} />
      <VehicleRecommendMain />
      <BlogList />
      <Separator gutter={15} />
      <EventBanner />
    </main>
  );
}

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <Layout>{Page}</Layout>;
};

export default Page;

export const getStaticProps = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/carbrand`);
  if (res.status !== 200) {
    return {
      notFound: true,
    };
  }
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};
