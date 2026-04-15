import { toast } from "sonner";

export function errorToaster(message: string): void {
  toast.error(message, { position: "top-right" });
}

export function successToaster(message: string): void {
  toast.success(message, { position: "top-right" });
}
