import BrandSort from "./BrandSort";
import Footer from "./Footer";
import Header from "./Header";
import LogoMainPage from "../ui/LogoMainPage";
import VehicleRecommendMain from "../pages/main/VehicleRecommendMain";
import SpotRecommand from "../pages/main/SpotRecommend";
import Separator from "../ui/Separator";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div>{props.children}</div>
      <LogoMainPage />
      <BrandSort />
      <VehicleRecommendMain />
      <SpotRecommand />
      <Separator gutter={30} />
      <Footer />
    </>
  );
}
