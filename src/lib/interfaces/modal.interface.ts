import * as React from "react";

export type ConfirmationModalHeaderProps = Partial<{
  title: string;
  icon: "alert" | "warning" | "check";
  description: string;
}>;

export type ConfirmationModalProps = ConfirmationModalHeaderProps &
  Partial<{
    buttonName: string;
    cancelBtn: string;
    okBtn: string;
    btnClasses: string;
    btnOkClasses: string;
    btnCancelClasses: string;
    onConfirm: () => void;
    onCancel: () => void;
    children: React.ReactNode;
  }>;
