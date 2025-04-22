import { GlobeIcon } from "@/assets/icons/menu/globe";
import { getItem, setItem } from "@/core/services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/components/shadcn-ui/dropdown-menu";
import { useTranslation } from "react-i18next";

function LanguageSelectMenu() {
  const currentLan = getItem("language");
  const { i18n } = useTranslation();

  const languages = [
    {
      lable: "English",
      tag: "en",
    },
    {
      lable: "Espaniol",
      tag: "sp",
    },
    {
      lable: "Hebrew",
      tag: "he",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <GlobeIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={40} side="right">
        {languages.map((lanItem) =>
          currentLan !== lanItem.tag ? (
            <DropdownMenuItem
              key={lanItem.tag} // Make sure to add a unique key for each item
              className="cursor-pointer"
              onClick={() => {
                i18n.changeLanguage(lanItem.tag);
                setItem("language", lanItem.tag);
              }}
            >
              {lanItem.lable}
            </DropdownMenuItem>
          ) : null
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelectMenu;
