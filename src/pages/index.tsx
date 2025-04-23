import { NextPage } from "next";
import { MainLayout } from "@/ui/layouts/MainLayout";
import { IndexWidget } from "@/ui/widgets/IndexWidget";

const Home: NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
} = () => {
  return <IndexWidget />;
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
