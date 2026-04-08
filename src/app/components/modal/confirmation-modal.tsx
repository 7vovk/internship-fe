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
import { siteConfig } from "@/config/site.config";

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
  title = "confirm_action",
  description,
  cancelBtn = "cancel",
  okBtn = "ok",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const tButton = useTranslations(siteConfig.buttons.translation);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">{tButton(buttonName)}</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{tButton(title)}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {tButton(cancelBtn)}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {tButton(okBtn)}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
