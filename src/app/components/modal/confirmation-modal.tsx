import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  Button,
} from "@/components/shared/ui";
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
  btnClasses,
  btnOkClasses,
  onConfirm,
  onCancel,
  icon,
  children,
}: ConfirmationModalProps) {
  const tButton = useTranslations(siteConfig.buttons.translation);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button className={btnClasses} variant="outline">
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
          <AlertDialogCancel onClick={onCancel}>
            {tButton(cancelBtn)}
          </AlertDialogCancel>
          <AlertDialogAction className={btnOkClasses} onClick={onConfirm}>
            {tButton(okBtn)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
