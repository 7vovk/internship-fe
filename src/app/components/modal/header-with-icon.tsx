import { AlertTriangleIcon, CheckIcon } from "lucide-react";
import {
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shared/ui";
import { JSX } from "react";
import { ConfirmationModalHeaderProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

export function HeaderWithIcon({
  title,
  icon,
  description,
}: ConfirmationModalHeaderProps): JSX.Element {
  return (
    <AlertDialogHeader>
      <div className="flex flex-wrap gap-2">
        {icon &&
          (icon === "check" ? (
            <CheckIcon className="text-green-700" />
          ) : (
            <AlertTriangleIcon
              className={cn(
                icon === "warning" && "text-yellow-500",
                icon === "alert" && "text-red-700",
              )}
            />
          ))}

        <AlertDialogTitle>{title}</AlertDialogTitle>
      </div>
      <AlertDialogDescription>{description}</AlertDialogDescription>
    </AlertDialogHeader>
  );
}
