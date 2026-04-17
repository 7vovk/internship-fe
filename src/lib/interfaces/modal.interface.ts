import * as React from "react";
import { IconEnum } from "@/lib/enums/app.enums";

export type ConfirmationModalHeaderProps = Partial<{
  title: string;
  icon?: IconEnum | null;
  description: string;
}>;

export type ConfirmationModalProps = ConfirmationModalHeaderProps &
  Partial<{
    buttonName: string;
    cancelBtn: string;
    okBtn: string;
    isDisabled: boolean;
    btnClasses: string;
    btnOkClasses: string;
    btnCancelClasses: string;
    onConfirm: () => void | boolean | Promise<void | boolean>;
    onCancel: () => void;
    children: React.ReactNode;
  }>;
