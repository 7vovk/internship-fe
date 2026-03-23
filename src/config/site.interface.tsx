import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button-variants";

export interface SiteConfig {
  title: string;
  greeting: string;
  navigation: CfgNavigation[];
  pages: Pages;
  buttons: Translation;
}

export interface CfgNavigation {
  href: string;
  label: string;
}

export interface Pages {
  home: Home;
  about: Translation;
  companies: Translation;
  company: Translation;
  profile: Translation;
  users: Translation;
  user: Translation;
}

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

export type TemplateAction = {
  href: string;
  label: string;
  variant?: ButtonVariant;
};

export interface Translation {
  translation: string;
}

export interface Home extends Translation {
  actions: TemplateAction[];
}
