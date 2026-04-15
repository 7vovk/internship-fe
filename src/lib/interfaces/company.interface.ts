import { User } from "@/lib/interfaces/user.interface";
import { Roles } from "@/lib/enums/profile.enums";

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
  roles: Roles[];
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
