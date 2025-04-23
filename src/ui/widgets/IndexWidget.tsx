import Image from "next/image";
// import { useRouter } from "next/router";
// import { useTranslation } from "react-i18next";
import fieldBgImage from "@/assets/images/field-bg.png";
import friendsImage from "@/assets/images/friends.png";
const IndexWidget = () => {
  // const { t } = useTranslation();
  // const router = useRouter();

  return (
    <div className="relative h-screen w-full">
      <Image
        src={fieldBgImage}
        alt="Background"
        fill
        priority
        quality={100}
        className="absolute inset-0 object-cover z-0"
      />
      <Image
        src={friendsImage}
        alt="Friends"
        width={400}
        height={400}
        className="absolute inset-0 object-cover z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* <h1 className="text-white text-4xl font-bold">{t("index.title")}</h1> */}
      </div>
    </div>
  );
};

export { IndexWidget };
