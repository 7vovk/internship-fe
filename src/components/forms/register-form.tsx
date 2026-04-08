"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site.config";
import { Logo } from "@/components/ui/logo";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { TextLink } from "@/components/ui/text-link";
import { toast } from "sonner";
import { createAccountAction } from "@/components/forms/register.server-action";
import { useAuth } from "@/hooks/useAuth.hook";
import { parseErrorMessage } from "@/lib/errors";
import {
  getRegisterPayloadSchema,
  getRegisterSchema,
} from "@/components/forms/auth.schema";

export default function RegisterForm() {
  const { submitLogin } = useAuth();
  const tAuth = useTranslations(siteConfig.pages.login.translation);

  const registerPayloadSchema = getRegisterPayloadSchema(tAuth);
  const formSchema = getRegisterSchema(tAuth);

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

  async function handleSubmit(): Promise<void> {
    try {
      const formData = formSchema.parse(form.getValues());
      const payload = registerPayloadSchema.parse(formData);

      const created = await createAccountAction(payload);
      if (!created.ok) {
        toast.error(created.message, { position: "top-right" });
        return;
      }

      await submitLogin({
        email: payload.email,
        password: payload.password,
        showCreateToast: true,
      });
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
            {tAuth("create_title")}
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
                      {tAuth("first_name")}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder={tAuth("first_name_placeholder")}
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
                      {tAuth("last_name")}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder={tAuth("last_name_placeholder")}
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
                      {tAuth("email")}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder={tAuth("email_placeholder")}
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
                      {tAuth("password")}
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
                      {tAuth("password_confirm")}
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
                {tAuth("create")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <TextLink
          text={tAuth("already_have")}
          link={"/login"}
          linkText={tAuth("sign_in")}
        />
      </div>
    </div>
  );
}
