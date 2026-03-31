"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site.config";
import { translate } from "@/lib/utils";
import { handleLogin } from "@/lib/api/auth";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { redirect, RedirectType } from "next/navigation";
import { GoogleIcon } from "./shared/google.icon";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "The password must be at least 6 characters."),
});

export default function Login02() {
  const login = useTranslations(siteConfig.pages.login.translation);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(): Promise<void> {
    try {
      const result = await handleLogin(form.getValues());
      if (result.statusCode === 200) {
        redirect("/", RedirectType.replace);
      }
    } catch (error) {
      throw error;
    }
  }

  function handleSignIn() {
    // TODO add google sign in for next.js app
  }

  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-balance text-center text-xl font-semibold text-foreground">
            {translate(login, "description")}
          </h2>
          <form
            id="login-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-6 space-y-4"
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    {translate(login, "email")}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={translate(login, "email_placeholder")}
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
                    {translate(login, "password")}
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
              form="login-form"
              className="mt-4 w-full py-2 font-medium"
            >
              {translate(login, "sign_in")}
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {translate(login, "or_with")}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="flex w-full items-center justify-center space-x-2 py-2"
            onClick={handleSignIn}
          >
            <GoogleIcon className="size-5" aria-hidden={true} />
            <span className="text-sm font-medium">
              {translate(login, "with_google")}
            </span>
          </Button>

          <p className="text-pretty mt-4 text-xs text-muted-foreground dark:text-muted-foreground">
            {translate(login, "you_agree")}{" "}
            <a href="#" className="underline underline-offset-4">
              {translate(login, "terms")}
            </a>{" "}
            {translate(login, "and")}{" "}
            <a href="#" className="underline underline-offset-4">
              {translate(login, "privacy")}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
