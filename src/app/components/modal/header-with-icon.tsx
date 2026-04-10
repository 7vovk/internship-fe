import { AlertTriangleIcon, CheckIcon } from "lucide-react";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shared/ui";
import { JSX } from "react";
import { ConfirmationModalHeaderProps } from "@/lib/interfaces";

export function HeaderWithIcon({
  title,
  icon,
  description,
}: ConfirmationModalHeaderProps): JSX.Element {
  return (
    <AlertDialogHeader>
      <div className="flex flex-wrap gap-2">
        {icon === "alert" && <AlertTriangleIcon className="text-red-700" />}
        {icon === "warning" && (
          <AlertTriangleIcon className="text-yellow-500" />
        )}
        {icon === "check" && <CheckIcon className="text-green-700" />}

        <AlertDialogTitle>{title}</AlertDialogTitle>
      </div>
      <AlertDialogDescription>{description}</AlertDialogDescription>
    </AlertDialogHeader>
  );
}
