"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  Button,
} from "@/components/shared/ui";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site.config";
import { HeaderWithIcon } from "@/app/components/modal/header-with-icon";
import { ConfirmationModalProps } from "@/lib/interfaces";

export function ConfirmationModal({
  buttonName = "showDialog",
  title = "confirmAction",
  description,
  cancelBtn = "cancel",
  okBtn = "ok",
  isDisabled = false,
  btnClasses,
  btnOkClasses,
  onConfirm,
  onCancel,
  icon,
  children,
}: ConfirmationModalProps) {
  const tButton = useTranslations(siteConfig.buttons.translation);
  const [open, setOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleConfirm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isConfirm) {
      return;
    }

    if (!onConfirm) {
      setOpen(false);
      return;
    }

    setIsConfirm(true);
    try {
      const shouldClose = await onConfirm();
      if (shouldClose !== false) {
        setOpen(false);
      }
    } finally {
      setIsConfirm(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            className={btnClasses}
            variant="outline"
            disabled={isDisabled}
          >
            {tButton(buttonName)}
          </Button>
        }
      />
      <AlertDialogContent>
        <HeaderWithIcon
          icon={icon}
          title={tButton(title)}
          description={description}
        />

        {children}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {tButton(cancelBtn)}
          </AlertDialogCancel>
          <AlertDialogAction
            className={btnOkClasses}
            onClick={handleConfirm}
            disabled={isConfirm}
          >
            {tButton(okBtn)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
