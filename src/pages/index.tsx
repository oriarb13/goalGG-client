import { NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "@/layouts/MainLayout";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("home.title")} | Goal-GG</title>
      </Head>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">{t("home.welcome")}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">
                {t("home.cards.events")}
              </h2>
            </CardHeader>
            <CardContent>
              <p>{t("home.cards.eventsDescription")}</p>
              <Button className="mt-4">{t("common.viewMore")}</Button>
            </CardContent>
          </Card>
          {/* כרטיסים נוספים כאן */}
        </div>
      </div>
    </>
  );
};

// הגדרת הלייאאוט לדף זה
Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
