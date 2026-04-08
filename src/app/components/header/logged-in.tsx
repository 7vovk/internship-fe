import { SessionLogoutButton } from "@/app/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User as Auth0User } from "@auth0/nextjs-auth0/types";
import type { User as AppUser } from "@/lib/api/interfaces";

type LoggedInProps = {
  authType: "auth0" | "jwt";
  logoutLabel: string;
  auth0User?: Auth0User;
  currentUser?: AppUser | null;
};

export function LoggedIn({
  authType,
  logoutLabel,
  auth0User,
  currentUser,
}: LoggedInProps) {
  const firstName = auth0User?.given_name ?? currentUser?.firstName ?? "User";
  const lastName = auth0User?.family_name ?? currentUser?.lastName ?? "Profile";
  const profileImage = auth0User?.picture;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-9 w-9">
        <AvatarImage alt={firstName} src={profileImage} />
        <AvatarFallback>
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <SessionLogoutButton label={logoutLabel} authType={authType} />
    </div>
  );
}
