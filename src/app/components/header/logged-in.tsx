import Image from "next/image";
import { User } from "@auth0/nextjs-auth0/types";
import { FALLBACK_AVATAR } from "@/app/components/header/fallback-avatar";
import { SessionLogoutButton } from "@/app/components";

type LoggedInProps = {
  authType: "auth0" | "jwt";
  logoutLabel: string;
  auth0User?: User;
};

export function LoggedIn({ authType, logoutLabel, auth0User }: LoggedInProps) {
  const imageSrc = auth0User?.picture ?? FALLBACK_AVATAR;
  const altText = auth0User?.name ?? "Profile";

  return (
    <div className="flex items-center gap-2">
      <Image
        src={imageSrc}
        alt={altText}
        referrerPolicy="no-referrer"
        className="size-8 rounded-full border border-border object-cover"
        width={40}
        height={40}
      />
      <SessionLogoutButton label={logoutLabel} authType={authType} />
    </div>
  );
}
