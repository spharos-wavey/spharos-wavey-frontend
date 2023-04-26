import EventBanner from "@/components/main/EventBanner";
import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/layouts/layout";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <h1> NextPageWithLayout 예시</h1>
      <EventBanner />
    </>
  );
};

Page.getLayout = function getLayout(Page: React.ReactNode) {
  return <Layout>{Page}</Layout>;
};

export default Page;
