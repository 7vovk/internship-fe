import { SessionLogoutButton } from "@/app/components/client/session-logout-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/ui/avatar";
import type { User as Auth0User } from "@auth0/nextjs-auth0/types";
import type { User as AppUser } from "@/lib/interfaces";
import Link from "next/link";
import { Routes } from "@/config/site.enums";
import { TooltipWrapper } from "@/components/shared/tooltip-wrapper";
import { getTranslations } from "next-intl/server";

type LoggedInProps = {
  authType: "auth0" | "jwt";
  logoutLabel: string;
  auth0User?: Auth0User;
  currentUser?: AppUser | null;
};

export async function LoggedIn({
  authType,
  logoutLabel,
  auth0User,
  currentUser,
}: LoggedInProps) {
  const firstName = auth0User?.given_name ?? currentUser?.firstName ?? "User";
  const lastName = auth0User?.family_name ?? currentUser?.lastName ?? "Profile";
  const profileImage = auth0User?.picture;
  const tProfile = await getTranslations("Profile");

  return (
    <div className="flex items-center gap-2">
      <TooltipWrapper text={tProfile("goTo")}>
        <Link
          href={Routes.PROFILE}
          aria-label={`Open ${firstName} ${lastName} profile`}
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage alt={firstName} src={profileImage} />
            <AvatarFallback firstName={firstName} lastName={lastName} />
          </Avatar>
        </Link>
      </TooltipWrapper>

      <SessionLogoutButton label={logoutLabel} authType={authType} />
    </div>
  );
}
