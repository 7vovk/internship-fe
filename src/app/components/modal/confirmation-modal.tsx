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

export function ConfirmationModal(props: {
  buttonName?: string;
  title?: string;
  description?: string;
  cancelBtn?: string;
  okBtn?: string;
}) {
  const {
    buttonName = "Show Dialog",
    title,
    description,
    cancelBtn = "Cancel",
    okBtn = "OK",
  } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">{buttonName}</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelBtn}</AlertDialogCancel>
          <AlertDialogAction>{okBtn}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
