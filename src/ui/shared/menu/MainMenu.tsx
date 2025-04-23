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
  console.log("isMobile", isMobile);
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  const landingPageMenuItems: MenuItem[] = [
    {
      label: t("mainMenu.ourStory"),
      isClicked: router.asPath === "/about",
      onClick: () => {
        router.push("/about");
      },
    },
    {
      label: t("mainMenu.login"),
      isClicked: false,
      onClick: () => {
        setIsLoginModalOpen(true);
      },
    },
    {
      label: t("mainMenu.signUp"),
      isClicked: false,
      onClick: () => {
        setIsSignUpModalOpen(true);
      },
    },
  ];

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
                src="/assets/images/logo.png"
                alt="Logo"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {landingPageMenuItems.map((item, index) => (
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
            {landingPageMenuItems.map((item, index) => (
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
            ))}
            <LanguageSelectMenu isMobile={true} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      />
    </>
  );
};

export { MainMenu };
