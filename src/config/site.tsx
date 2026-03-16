import { SiteConfig } from "@/config/site.interface";

export const siteConfig: SiteConfig = {
  name: "Internship FE",
  greeting: "Welcome!",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/companies", label: "Companies" },
    { href: "/profile", label: "Profile" },
    { href: "/users", label: "Users" },
  ],
  pages: {
    home: {
      title: "Internship FE",
      description:
        "Welcome! This starter layout is built for reuse, so every page can share the same template and content structure.",
      actions: [
        { href: "/about", label: "About project" },
        { href: "/users", label: "View users", variant: "outline" },
      ],
    },
    about: {
      title: "About",
      description:
        "This page uses the shared page template so titles, spacing, and actions stay consistent across the app.",
    },
    companies: {
      title: "Companies",
      description:
        "Company pages can reuse the same shell while swapping only the data they need to display.",
    },
    profile: {
      title: "Profile",
      description:
        "Profile pages can share the same layout and plug in profile-specific content when needed.",
    },
    users: {
      title: "Users",
      description:
        "User pages now follow the same reusable structure as the rest of the app for easier maintenance.",
    },
  },
};
