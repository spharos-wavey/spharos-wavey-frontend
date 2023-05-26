import SimpleBackLayout from "@/components/layouts/simpleBack/SimpleBackLayout";
import LicenseWrapper from "@/components/pages/license/LicenseWrapper";

export default function License() {
 
  return (
    <main>
      <section>
       <LicenseWrapper />
      </section>
    </main>
  );
}

License.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title="운전면허증 등록">{Page}</SimpleBackLayout>;
};
