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
