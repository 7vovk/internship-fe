import { SiteConfig } from "./site.interface";
import { Routes } from "@/config/site.enums";

export const siteConfig: SiteConfig = {
  title: "title",
  greeting: "greeting",
  navigation: [
    { href: Routes.HOME, label: "home", public: true },
    { href: Routes.HEALTH, label: "health", public: true },
    { href: Routes.ABOUT, label: "about", public: true },
    { href: Routes.COMPANIES, label: "companies", public: false },
    { href: Routes.PROFILE, label: "profile", public: false },
    { href: Routes.USERS, label: "users", public: false },
  ],
  pages: {
    home: {
      translation: "HomePage",
      actions: [
        { href: Routes.ABOUT, label: "about" },
        { href: Routes.USERS, label: "viewUsers", variant: "outline" },
      ],
    },
    about: { translation: "About" },
    companies: { translation: "Companies" },
    company: { translation: "Company" },
    profile: { translation: "Profile" },
    users: { translation: "Users" },
    user: { translation: "User" },
    health: { translation: "Health" },
    login: { translation: "Auth" },
    quizzes: { translation: "Quizzes" },
  },
  buttons: {
    translation: "Buttons",
  },
};
