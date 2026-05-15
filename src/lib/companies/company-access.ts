import type { Company } from "@/lib/interfaces";

export type CompanyAccess = {
  canView: boolean;
  canManage: boolean;
};

export function getCompanyAccess(
  company: Company,
  userId: string | undefined,
): CompanyAccess {
  if (!userId) {
    return { canView: false, canManage: false };
  }

  const isOwner = company.ownerId === userId;
  const isAdmin = company.admins.some((admin) => admin.id === userId);
  const isMember = company.members.some((member) => member.id === userId);

  return {
    canView: isOwner || isAdmin || isMember,
    canManage: isOwner || isAdmin,
  };
}
