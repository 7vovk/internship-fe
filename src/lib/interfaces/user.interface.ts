import { Company } from "./company.interface";

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
  invitedTo?: Company[];
  companyAdministration?: Company[];
}

export type UserUpdatePayload = Partial<{
  password: string;
  description: string;
  firstName: string;
  lastName: string;
}>;

export interface UserInfoResponse extends User {
  averageScore: number | null;
  rating: number | null;
  quizScoreDynamics: QuizScoreDynamicsItem[];
}

export interface QuizScoreDynamicsItem {
  quizId: string;
  quizTitle: string;
  dynamics: QuizDynamic[];
  averageScore?: number;
  lastCompletedAt?: Date;
}

export interface QuizDynamic {
  completedAt: Date;
  score: number;
  questionCount: number;
}
