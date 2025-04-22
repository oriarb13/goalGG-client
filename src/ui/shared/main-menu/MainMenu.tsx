import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { RelyOnIcon } from "@/assets/icons/relyon";
import { useUser } from "@/core/hooks/use-user";
import { GroupIcon } from "@/assets/icons/groups";
import { SettingsIcon } from "@/assets/icons/menu/settings";
import { LogOutIcon } from "lucide-react";
import MenuItemButton, {
  MainMenuItemButton,
} from "./helperWidgets/MenuItemButton";
import UserProfileSection from "./helperWidgets/UserProfileSection";
import { useStyle } from "./helperWidgets/MenuStyles";
import { LanguageSelectMenu } from "./helperWidgets/LanguageSelectMenu";
import { DashboardUsersIcon } from "@/assets/icons/menu/dashboard-users";
import { CallsIcon } from "@/assets/icons/menu/calls";
import { GeofencingIcon } from "@/assets/icons/menu/geofencing";
import { UserRoles } from "@/core/enums/user-roles";

// Adjust the imports according to your project structure
// Add the other icons that were used in your original code

const MainMenuWidget = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { user } = useUser();
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const route = useRouter();
  const { classes } = useStyle();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const userProfile = {
    firstName:
      user?.displayName?.trim().split(" ")[0] || "(first name unavailable)",
    lastName:
      user?.displayName?.trim().split(" ")[1] || "(last name unavailable)",
    photoURL: user?.photoURL,
    displayName: user?.displayName || "",
    role: user?.customClaims?.serviceProvider?.role,
  };

  const menuItems = {
    mainButton: {
      icon: RelyOnIcon,
      label: t("mainMenu.expandMenu"),
      onClick: () => {
        setIsExpanded(!isExpanded);
      },
    },
    admin: [
      {
        icon: DashboardUsersIcon,
        label: t("mainMenu.manageSubscriptions"),
        isClicked: route.asPath === "/manageSubscriptions",
        onClick: () => {
          route.push("/manageSubscriptions");
        },
      },
    ],

    management: [
      {
        icon: GroupIcon,
        label: t("mainMenu.groups"),
        isClicked: route.asPath === "/groups",
        onClick: () => {
          route.push("/groups");
        },
      },
      {
        icon: CallsIcon,
        label: t("mainMenu.calls"),
        isClicked: route.asPath === "/calls",
        onClick: () => {
          route.push("/calls");
        },
      },
      {
        icon: GeofencingIcon,
        label: t("mainMenu.geofencing"),
        isClicked: route.asPath === "/geofencing",
        onClick: () => {
          route.push("/geofencing");
          setIsOpen(false);
        },
      },
    ],

    system: [
      {
        icon: SettingsIcon,
        label: t("mainMenu.settings"),
        isClicked: route.asPath === "/settings",
        onClick: () => {
          route.push("/settings");
        },
      },
      {
        icon: LanguageSelectMenu,
        label: i18n.language.toUpperCase(),
        onClick: () => {
          setIsExpanded(false);
        },
      },
      {
        icon: LogOutIcon,
        label: t("mainMenu.logout"),
        onClick: () => {
          localStorage.clear();
          route.push("/login");
        },
      },
    ],
  };

  const menuItemsList =
    user?.userDoc?.isSuperAdmin ||
    user?.customClaims?.serviceProvider?.role === UserRoles.ADMIN
      ? [...menuItems.management, ...menuItems.admin]
      : menuItems.management;

  // Mobile Menu
  if (isMobile) {
    return (
      <div
        className={classes.mobileContainer}
        style={{
          transform: isExpanded ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="pt-4 pb-2 px-4 flex justify-between items-center border-b border-gray-200">
          <div
            className="cursor-pointer"
            onClick={menuItems.mainButton.onClick}
          >
            <RelyOnIcon />
          </div>
          <button
            className="p-2 text-gray-600"
            onClick={() => setIsExpanded(false)}
          >
            ✕
          </button>
        </div>

        <div className={classes.menuItemsContainer}>
          {user?.uid && (
            <div className="w-full flex flex-col">
              {menuItemsList.map(
                (item) =>
                  item && (
                    <MenuItemButton
                      key={uuidv4()}
                      item={item}
                      isExpanded={true}
                    />
                  )
              )}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200">
          {user?.uid && (
            <>
              <div className="w-full flex flex-col">
                {menuItems.system.map((item) => (
                  <MenuItemButton
                    key={uuidv4()}
                    item={item}
                    isExpanded={true}
                  />
                ))}
              </div>
              <div className={classes.profileContainer}>
                <UserProfileSection user={userProfile} isExpanded={true} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Desktop Menu as Navbar
  return (
    <div className={classes.desktopContainer}>
      <div className={classes.logoContainer}>
        <div className="cursor-pointer" onClick={menuItems.mainButton.onClick}>
          <RelyOnIcon />
        </div>
        <h1 className="font-bold text-xl">RelyOn</h1>
      </div>

      {user?.uid && (
        <div className={classes.desktopMenuItems}>
          {menuItemsList.map(
            (item) =>
              item && (
                <MenuItemButton key={uuidv4()} item={item} isExpanded={false} />
              )
          )}

          {menuItems.system.slice(0, -1).map((item) => (
            <MenuItemButton key={uuidv4()} item={item} isExpanded={false} />
          ))}

          <div className={classes.desktopProfileContainer}>
            <UserProfileSection user={userProfile} isExpanded={false} />
          </div>

          <MenuItemButton
            key={uuidv4()}
            item={menuItems.system[menuItems.system.length - 1]} // Logout button
            isExpanded={false}
          />
        </div>
      )}
    </div>
  );
};

export { MainMenuWidget };
