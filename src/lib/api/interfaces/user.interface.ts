import { Company, CompanyAdministration, InvitedTo } from "./company.interface";

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
  companies?: Company[];
  invitedTo?: InvitedTo[];
  companyAdministration?: CompanyAdministration[];
}
