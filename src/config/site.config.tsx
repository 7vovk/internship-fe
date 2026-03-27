import { SiteConfig } from "./site.interface";

export const siteConfig: SiteConfig = {
  title: "title",
  greeting: "greeting",
  navigation: [
    { href: "/", label: "home", public: true },
    { href: "/health", label: "health", public: true },
    { href: "/about", label: "about", public: true },
    { href: "/companies", label: "companies", public: false },
    { href: "/profile", label: "profile", public: false },
    { href: "/users", label: "users", public: false },
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
    login: { translation: "Login" },
  },
  buttons: {
    translation: "Buttons",
  },
};
