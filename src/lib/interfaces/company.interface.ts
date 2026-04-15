import { User } from "@/lib/interfaces/user.interface";
import { actionButtons } from "@/lib/constants/company.constants";

export interface CompanyData {
  id: string;
  createDate: string;
  updateDate: string;
  name: string;
  description: string;
  website: string;
  address: string;
  phone: string;
  isActive: boolean;
  isVisibleForAll: boolean;
  ownerId: string;
}

export interface Company extends CompanyData {
  members: User[];
  admins: User[];
  owner: User;
}

export interface CompanyFormData {
  name: string;
  description?: string;
  website?: string;
  address?: string;
  phone?: string;
  isVisibleForAll?: boolean;
}

export type ProfileCompanyData = Pick<
  Company,
  | "id"
  | "name"
  | "description"
  | "website"
  | "address"
  | "phone"
  | "createDate"
  | "updateDate"
> & {
  roles: Array<"owner" | "admin" | "user">;
};

type ActionButtons = (typeof actionButtons)[number];
export type CompanyActions = Partial<{
  [K in ActionButtons]: boolean;
}>;
