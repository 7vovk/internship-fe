import { SiteConfig } from "./site.interface";

export const siteConfig: SiteConfig = {
  title: "title",
  greeting: "greeting",
  navigation: [
    { href: "/", label: "home" },
    { href: "/health", label: "health" },
    { href: "/about", label: "about" },
    { href: "/companies", label: "companies" },
    { href: "/profile", label: "profile" },
    { href: "/users", label: "users" },
  ],
  pages: {
    home: {
      translation: "HomePage",
      actions: [
        { href: "/about", label: "about" },
        { href: "/users", label: "view_users", variant: "outline" },
      ],
    },
    about: { translation: "About" },
    companies: { translation: "Companies" },
    company: { translation: "Company" },
    profile: { translation: "Profile" },
    users: { translation: "Users" },
    user: { translation: "User" },
    health: { translation: "Health" },
  },
  buttons: {
    translation: "Buttons",
  },
};
