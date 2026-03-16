import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button-variants";

export interface SiteConfig {
  name: string;
  greeting: string;
  navigation: CfgNavigation[];
  pages: Pages;
}

export interface CfgNavigation {
  href: string;
  label: string;
}

export interface Pages {
  home: Home;
  about: About;
  companies: Companies;
  profile: Profile;
  users: Users;
}

export interface Home {
  title: string;
  description: string;
  actions: TemplateAction[];
}

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

export type TemplateAction = {
  href: string;
  label: string;
  variant?: ButtonVariant;
};

export interface About {
  title: string;
  description: string;
}

export interface Companies {
  title: string;
  description: string;
}

export interface Profile {
  title: string;
  description: string;
}

export interface Users {
  title: string;
  description: string;
}
