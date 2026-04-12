import { AuthType } from "@/hooks/useAuth.hook";
import { User } from "@/lib/interfaces";
import { EditPassword } from "@/components/profile/forms/edit-password";
import { AccountDelete } from "@/components/profile/forms/account-delete";
import { AccountUpdate } from "@/components/profile/forms/account-update";

type ProfileEditProps = {
  authType: AuthType;
  currentUser: User | null;
};

export default function ProfileEdit({
  authType,
  currentUser,
}: ProfileEditProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <AccountUpdate currentUser={currentUser} />

      <EditPassword />

      <AccountDelete authType={authType} />
    </div>
  );
}
