import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldLabel,
  Input,
  PasswordInput,
} from "../shared/ui";
import TextareaCharLeft from "@/components/shared/ui/textarea-chars";

interface FormControllerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: "password" | "textarea";
  autoComplete?: string;
}

export default function FormController<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  type,
  autoComplete,
}: FormControllerProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {type === "password" && (
            <PasswordInput
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete={autoComplete}
            />
          )}

          {type === "textarea" && (
            <TextareaCharLeft
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
            />
          )}

          {!type && (
            <Input
              {...field}
              id={field.name}
              type={type}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete={autoComplete}
            />
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
