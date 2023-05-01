import EventBanner from "@/components/pages/main/EventBanner";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/layouts/layout";
import LogoMainPage from "@/components/ui/Logo";
import BrandSort from "@/components/pages/main/brandsortSection/BrandSort";
import VehicleRecommendMain from "@/components/pages/main/vehicleRecommendSection/VehicleRecommendMain";
import Separator from "@/components/ui/Separator";

const Page: NextPageWithLayout = () => {
  return (
    <main>
      <LogoMainPage />
      <BrandSort />
      <VehicleRecommendMain />
      <Separator gutter={20} />
      <EventBanner />
    </main>
  );
};

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <Layout>{Page}</Layout>;
};

export default Page;
