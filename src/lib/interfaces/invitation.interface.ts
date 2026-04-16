export interface Invitation {
  id: string;
  ownerId: string;
  companyId: string;
  email: string;
  status: string;
  type: string;
  createDate: string;
  updateDate: string;
}

export interface OwnerInvitationFormData {
  emails: string[];
}

export interface InvTableRow {
  id: string;
  email: string;
  companyName?: string;
  status: string;
  type: string;
  createDate: string;
  updateDate: string;
}
