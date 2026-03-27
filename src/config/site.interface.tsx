import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button-variants";
import { standardPageKeys } from "./site.constants";

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
  public: boolean;
}

type StandardPageKeys = (typeof standardPageKeys)[number];
type PageData = {
  [K in StandardPageKeys]: Translation;
};

export interface Pages extends PageData {
  home: Home;
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
