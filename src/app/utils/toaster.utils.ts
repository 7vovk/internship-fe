import { toast } from "sonner";

export function errorToaster(message: string): void {
  toast.error(message, { position: "top-right" });
}
