import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/ui/components/shadcn-ui/tooltip';

type MenuItem = {
  icon: React.ComponentType;
  label: string;
  onClick?: () => void;
  isClicked?: boolean;
};

const MenuItemButton = ({
  item,
  isExpanded,
}: {
  key: string;
  item: MenuItem;
  isExpanded: boolean;
}) => {
  const handleOnClick = () => {
    item.onClick && item.onClick();
  };

  if (!isExpanded) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`${
              item.isClicked && 'bg-[#1F606C33]'
            } w-full py-2 cursor-pointer flex hover:bg-[#1F606C33] justify-center`}
            onClick={handleOnClick}
          >
            {<item.icon />}
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={10} side="right">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div
      className={`flex justify-center hover:bg-[#1F606C33] ${item.isClicked ? 'bg-[#1F606C33]' : ''}`}
      onClick={handleOnClick}
    >
      <div className="w-[75%] py-2 cursor-pointer flex gap-5 items-center">
        {<item.icon />}
        <div className="text-lg font-normal text-contentColor">
          {item.label}
        </div>
      </div>
    </div>
  );
};

export default MenuItemButton;

const MainMenuItemButton = ({
  item,
  isExpanded,
}: {
  item: MenuItem;
  isExpanded: boolean;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div 
          onClick={item.onClick}
          className="cursor-pointer p-2 hover:bg-[#1F606C33] rounded-md flex items-center justify-center"
        >
          {<item.icon />}
        </div>
      </TooltipTrigger>
      {!isExpanded && (
        <TooltipContent sideOffset={25} side="right">
          {item.label}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export { MainMenuItemButton };