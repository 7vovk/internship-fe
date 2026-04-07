"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site.config";
import { Logo } from "@/components/ui/logo";
import { translate } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { TextLink } from "@/components/ui/text-link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { handleLogin } from "@/lib/api/auth";
import { update } from "@/lib/features/auth/auth-slice";
import { toast } from "sonner";
import { createAccountAction } from "@/components/login-05.server-action";
import { parseErrorMessage } from "@/lib/errors";

export default function Login05() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useTranslations(siteConfig.pages.login.translation);

  const registerPayloadSchema = z.object({
    firstName: z.string().min(1, translate(auth, "required")).max(100).trim(),
    lastName: z.string().min(1, translate(auth, "required")).max(100).trim(),
    email: z.string().email(translate(auth, "email_error")),
    password: z.string().min(6, translate(auth, "password_error")),
  });

  const formSchema = registerPayloadSchema
    .extend({
      confirmPassword: z.string().min(6, translate(auth, "password_error")),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: translate(auth, "confirm_password_error"),
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function navigateToHome(): void {
    router.replace("/");
    router.refresh();
  }

  async function handleSubmit(): Promise<void> {
    try {
      const formData = formSchema.parse(form.getValues());
      const payload = registerPayloadSchema.parse(formData);

      const created = await createAccountAction(payload);
      if (!created.ok) {
        toast.error(created.message, { position: "top-right" });
        return;
      }

      const result = await handleLogin({
        email: payload.email,
        password: payload.password,
      });

      if (result.statusCode === 200) {
        const user = result.result?.user;

        if (user) {
          dispatch(
            update({
              isAuthenticated: true,
              userId: user.id,
              userRoles: user.roles?.length ? user.roles.join(", ") : null,
            }),
          );
        }

        toast.success("Account has been created successfully.", {
          position: "top-center",
          onDismiss: navigateToHome,
          onAutoClose: navigateToHome,
          action: {
            label: "Ok",
            onClick: navigateToHome,
          },
        });
      }
    } catch (error) {
      const message = parseErrorMessage(error);
      toast.error(message, { position: "top-right" });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo
            className="mx-auto h-10 w-10 text-foreground dark:text-foreground"
            aria-hidden={true}
          />
          <h3 className="text-balance mt-2 text-center text-lg font-bold text-foreground dark:text-foreground">
            {translate(auth, "create_title")}
          </h3>
        </div>

        <Card className="mt-4 shadow-2xs sm:mx-auto sm:w-full sm:max-w-md">
          <CardContent>
            <form
              id="create-account-form"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {translate(auth, "first_name")}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder={translate(auth, "first_name_placeholder")}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {translate(auth, "last_name")}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder={translate(auth, "last_name_placeholder")}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {translate(auth, "email")}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder={translate(auth, "email_placeholder")}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {translate(auth, "password")}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="**************"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {translate(auth, "password_confirm")}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="**************"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                form="create-account-form"
                className="w-full py-2 font-medium"
              >
                {translate(auth, "create")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <TextLink
          text={translate(auth, "already_have")}
          link={"/login"}
          linkText={translate(auth, "sign_in")}
        />
      </div>
    </div>
  );
}
