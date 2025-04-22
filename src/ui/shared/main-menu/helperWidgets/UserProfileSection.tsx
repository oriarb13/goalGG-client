import { UserRoles } from "@/core/enums/user-roles";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

type UserProfile = {
  firstName: string;
  lastName: string;
  photoURL?: string;
  displayName: string;
  role?: string;
};

const UserProfileSection = ({
  user,
  isExpanded,
}: {
  user: UserProfile;
  isExpanded: boolean;
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const getInitials = () => {
    return `${user.firstName.charAt(0).toUpperCase()}${user.lastName
      .charAt(0)
      .toUpperCase()}`;
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <div
      className={`flex gap-4 p-2 cursor-pointer hover:bg-[#1F606C33] rounded-md ${
        isExpanded ? "w-[87%]" : "justify-center"
      }`}
      onClick={handleProfileClick}
    >
      <div className="bg-[#ffe59d] rounded-full p-4 text-white h-10 w-10 flex justify-center items-center">
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt="User's profile picture"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <span>{getInitials()}</span>
        )}
      </div>
      {isExpanded && (
        <div className="flex flex-col justify-center">
          <div className="font-medium">{user.displayName}</div>
          <div className="text-gray-600 text-sm">
            {user.role === UserRoles.ADMIN
              ? t("mainMenu.admin")
              : t("mainMenu.operator")}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileSection;
