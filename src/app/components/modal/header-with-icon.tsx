import { AlertTriangleIcon, CheckIcon } from "lucide-react";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shared/ui";
import { JSX } from "react";
import { ConfirmationModalHeaderProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { IconEnum } from "@/lib/enums/app.enums";

export function HeaderWithIcon({
  title,
  icon,
  description,
}: ConfirmationModalHeaderProps): JSX.Element {
  return (
    <AlertDialogHeader>
      <div className="flex flex-wrap gap-2">
        {icon &&
          (icon === IconEnum.CHECK ? (
            <CheckIcon className="text-green-700" />
          ) : (
            <AlertTriangleIcon
              className={cn(
                icon === IconEnum.WARNING && "text-yellow-500",
                icon === IconEnum.ALERT && "text-red-700",
              )}
            />
          ))}

        <AlertDialogTitle>{title}</AlertDialogTitle>
      </div>
      <AlertDialogDescription>{description}</AlertDialogDescription>
    </AlertDialogHeader>
  );
}
