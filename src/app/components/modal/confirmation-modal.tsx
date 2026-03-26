import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

type ConfirmationModalProps = {
  buttonName?: string;
  title?: string;
  description?: string;
  cancelBtn?: string;
  okBtn?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function ConfirmationModal({
  buttonName = "show_dialog",
  title,
  description,
  cancelBtn = "cancel",
  okBtn = "ok",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const button = useTranslations(siteConfig.buttons.translation);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">{button(buttonName)}</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {button(cancelBtn)}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {button(okBtn)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
