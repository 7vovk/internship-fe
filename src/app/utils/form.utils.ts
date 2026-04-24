import { FieldValues, UseFormReturn } from "react-hook-form";
import { errorToaster } from "./toaster.utils";

export async function validateFormBeforeSubmit<
  TFieldValues extends FieldValues,
>(
  form: UseFormReturn<TFieldValues>,
  requiredMessage: string,
): Promise<boolean> {
  const isValid = await form.trigger(undefined, { shouldFocus: true });

  if (!isValid) {
    errorToaster(requiredMessage);
  }

  return isValid;
}
