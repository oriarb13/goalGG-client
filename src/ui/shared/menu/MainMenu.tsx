import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Button } from "@/ui/shadCN/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSelectMenu } from "./LanguageSelectMenu";
import { LoginModal } from "./LoginModal";
import { SignUpModal } from "./SignupModal";
import logoImage from "@/assets/images/logo.png";
import ProfileSection from "./ProfileSection";
// Redux imports
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout, checkAuthentication } from "@/store/userSlice";

interface MenuItem {
  icon?: React.ReactNode;
  label: string;
  isClicked: boolean;
  onClick: () => void;
}

const MainMenu = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useAppDispatch();

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Add token check periodically for menu state
  useEffect(() => {
    // Check on initial render
    dispatch(checkAuthentication());

    // Check every 10 seconds
    const interval = setInterval(() => {
      dispatch(checkAuthentication());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  const { user, loading, isAuthenticating } = useAppSelector(
    (state) => state.user
  );

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const landingPageMenuItems: MenuItem[] = [
    {
      label: t("mainMenu.login"),
      isClicked: false,
      onClick: () => {
        setIsLoginModalOpen(true);
      },
    },
    {
      label: t("mainMenu.register"),
      isClicked: false,
      onClick: () => {
        setIsSignUpModalOpen(true);
      },
    },
  ];

  const connectedUserMenuItems: MenuItem[] = [
    {
      label: t("mainMenu.main"),
      isClicked: false,
      onClick: () => {
        router.push("/main");
      },
    },
    {
      label: t("mainMenu.field"),
      isClicked: false,
      onClick: () => {
        router.push("/field");
      },
    },
    {
      label: t("mainMenu.groups"),
      isClicked: false,
      onClick: () => {
        router.push("/groups");
      },
    },
    {
      label: "Profile",
      isClicked: false,
      icon: <ProfileSection />,
      onClick: () => {},
    },
    {
      label: t("mainMenu.logout"),
      isClicked: false,
      onClick: handleLogout,
    },
  ];

  const openLoginModal = () => {
    setIsSignUpModalOpen(false);
    setTimeout(() => {
      setIsLoginModalOpen(true);
    }, 100);
  };

  const openSignUpModal = () => {
    setIsLoginModalOpen(false);
    setTimeout(() => {
      setIsSignUpModalOpen(true);
    }, 100);
  };

  // If authenticating or loading, don't render anything
  if (isAuthenticating || loading) {
    return null;
  }

  // Check for token before rendering user menu items
  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("token");
  const shouldShowUserMenu = user && hasToken;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50">
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="p-0"
            >
              <Image
                src={logoImage}
                alt="Logo"
                width={100}
                height={100}
                className="h-12 w-auto"
              />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-around w-full">
            <Button
              variant={router.asPath === "/about" ? "default" : "ghost"}
              onClick={() => router.push("/about")}
              className={cn(
                "text-base",
                router.asPath === "/about" &&
                  "bg-primary text-primary-foreground"
              )}
            >
              {t("mainMenu.ourStory")}
            </Button>

            {/* landing page menu items */}
            {!shouldShowUserMenu &&
              landingPageMenuItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.isClicked ? "default" : "ghost"}
                  onClick={item.onClick}
                  className={cn(
                    "text-base",
                    item.isClicked && "bg-primary text-primary-foreground"
                  )}
                >
                  {item.label}
                </Button>
              ))}

            {/* connected user menu items */}
            {shouldShowUserMenu &&
              connectedUserMenuItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.isClicked ? "default" : "ghost"}
                  onClick={item.onClick}
                  className={cn(
                    "text-base",
                    item.isClicked && "bg-primary text-primary-foreground"
                  )}
                >
                  {item.label === "Profile" ? <ProfileSection /> : item.label}
                </Button>
              ))}
            <LanguageSelectMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 z-40 w-64 bg-background shadow-xl transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-16">
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X />
            </Button>
          </div>
          <div className="flex-1 flex flex-col p-4 space-y-4">
            {/* Mobile menu items - check token here too */}
            {!shouldShowUserMenu
              ? landingPageMenuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant={item.isClicked ? "default" : "ghost"}
                    onClick={item.onClick}
                    className={cn(
                      "justify-start text-base w-full",
                      item.isClicked && "bg-primary text-primary-foreground"
                    )}
                  >
                    {item.label}
                  </Button>
                ))
              : connectedUserMenuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant={item.isClicked ? "default" : "ghost"}
                    onClick={item.onClick}
                    className={cn(
                      "justify-start text-base w-full",
                      item.isClicked && "bg-primary text-primary-foreground"
                    )}
                  >
                    {item.label === "Profile" ? <ProfileSection /> : item.label}
                  </Button>
                ))}
            <LanguageSelectMenu isMobile={true} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        openSignUpModal={openSignUpModal}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        openLoginModal={openLoginModal}
      />
    </>
  );
};

export { MainMenu };
