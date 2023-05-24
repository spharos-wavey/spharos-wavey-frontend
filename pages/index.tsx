import EventBanner from "@/components/pages/main/EventBanner";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/layouts/layout";
import LogoMainPage from "@/components/ui/Logo";
import BrandSort from "@/components/pages/main/brandsortSection/BrandSort";
import VehicleRecommendMain from "@/components/pages/main/vehicleRecommendSection/VehicleRecommendMain";
import Separator from "@/components/ui/Separator";
import { brandSortType } from "@/types/brandSortType";

function Page(props: { data: brandSortType[]; }) {
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
  return <Layout>{Page}</Layout>;
};

export default Page;

export const getStaticProps = async () => {

  const res = await fetch("https://api-billita.xyz/carbrand");
  const data = await res.json();

  return {
    props: {
      data : data,
    },
  };
}
