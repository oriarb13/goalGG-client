import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shadCN/avatar";
import { useAppSelector } from "@/store/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/shadCN/dropdown-menu";
import { DownArrow } from "@/assets/icons/DownArrow";

const ProfileSection = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="flex gap-1 items-center justify-center">
      <Avatar>
        <AvatarImage src={user?.image} alt={user?.firstName} />
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <DownArrow
              className="w-15 h-15 text-white "
              size={40}
              color="white"
            />
            {/* <div>adasdasdad</div> */}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-4 w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileSection;
