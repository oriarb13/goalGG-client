import { useState, useEffect } from "react";
import { SportCategoryEnum, ClubStatusEnum } from "@/types/enums";
import { IClub } from "@/types/types";
import { useTranslation } from "react-i18next";
import ClubsTable from "./table/ClubsTable";
import { useAppSelector } from "@/store/store";

const AllClubsWidget = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);

  const [clubs, setClubs] = useState<IClub[]>([
    {
      _id: "1",
      name: "מועדון 1",
      description: "תיאור של מועדון 1",
      admin: "1",
      captains: ["1", "2"],
      members: [{ userId: "1", skillRating: 10, positions: ["1", "2"] }],
      pendingRequests: [{ userId: "1", role: "1" }],
      sportCategory: SportCategoryEnum.FOOTBALL,
      image: "/default-profile.jpg",
      status: ClubStatusEnum.ACTIVE,
      isPrivet: true,
      maxPlayers: 10,
      location: {
        country: "ישראל",
        city: "תל אביב",
        address: "רחוב אלנבי 1",
        lat: 32.0853,
        lng: 34.7818,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "2",
      name: "מועדון 2",
      description: "תיאור של מועדון 2",
      admin: "2",
      captains: ["2", "3"],
      members: [{ userId: "2", skillRating: 8, positions: ["2", "3"] }],
      pendingRequests: [],
      sportCategory: SportCategoryEnum.BASKETBALL,
      image: "/default-profile.jpg",
      status: ClubStatusEnum.ACTIVE,
      isPrivet: false,
      maxPlayers: 15,
      location: {
        country: "ישראל",
        city: "ירושלים",
        address: "רחוב יפו 10",
        lat: 31.7857,
        lng: 35.2007,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // לטעינת נתונים מהשרת, אם צריך
  useEffect(() => {
    // אם יש לך API לטעינת מועדונים, תוכל להשתמש בו כאן
    // const fetchClubs = async () => {
    //   try {
    //     const response = await fetch('/api/clubs');
    //     const data = await response.json();
    //     setClubs(data);
    //   } catch (error) {
    //     console.error('שגיאה בטעינת מועדונים:', error);
    //   }
    // };
    //
    // fetchClubs();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 relative z-10 min-h-screen">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {t("club.allClubs")}
        </h1>
        <p className="text-sm mb-6 text-center text-gray-400">
          {t("club.chooseOrCreateClub")}
        </p>

        <ClubsTable clubs={clubs} user={user!} />
      </div>
    </div>
  );
};

export default AllClubsWidget;
