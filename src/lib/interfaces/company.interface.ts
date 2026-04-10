export interface Company {
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

export interface InvitedTo {
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

export interface CompanyAdministration {
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
