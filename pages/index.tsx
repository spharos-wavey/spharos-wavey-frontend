import EventBanner from "@/components/pages/main/EventBanner";
import { NextPageWithLayout } from "./_app";
import Layout from "@/components/layouts/layout";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <h1> 한글 폰트 입니다.</h1>
      <EventBanner />
    </>
  );
};

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <Layout>{Page}</Layout>;
};

export default Page;
