import { Company, CompanyData } from "./company.interface";

export interface User {
  createDate: string;
  description: string;
  email: string;
  firstName: string;
  id: string;
  isActive: boolean;
  isArchived: boolean;
  lastName: string;
  roles: string[];
  updateDate: string;
  profilePicture?: string;
  profilePictureUrl?: string;
  companies?: Company[];
  invitedTo?: CompanyData[];
  companyAdministration?: CompanyData[];
}

export type UserUpdatePayload = Partial<{
  password: string;
  description: string;
  firstName: string;
  lastName: string;
}>;
