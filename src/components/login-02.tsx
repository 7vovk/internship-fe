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
import { useRouter } from "next/navigation";
import { GoogleIcon } from "./shared/google.icon";
import { useAppDispatch } from "@/lib/store/hooks";
import { update } from "@/lib/features/auth/auth-slice";
import { TextLink } from "@/components/ui/text-link";
import { Card, CardContent } from "@/components/ui/card";

export default function Login02() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useTranslations(siteConfig.pages.login.translation);

  const formSchema = z.object({
    email: z.string().email(translate(auth, "email_error")),
    password: z.string().min(6, translate(auth, "password_error")),
  });

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
        router.replace("/");
        router.refresh();
      }
    } catch (error) {
      throw error;
    }
  }

  function handleSignInWithGoogle() {
    const returnTo = `${window.location.origin}/`;
    const url = new URL("/auth/login", window.location.origin);
    url.searchParams.set("connection", "google-oauth2");
    url.searchParams.set("prompt", "login");
    url.searchParams.set("screen_hint", "login");
    url.searchParams.set("returnTo", returnTo);
    window.location.href = url.toString();
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-balance text-center text-xl font-semibold text-foreground">
            {translate(auth, "description")}
          </h2>
          <Card className="mt-4 shadow-2xs sm:mx-auto sm:w-full sm:max-w-md">
            <CardContent>
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

                <Button
                  type="submit"
                  form="login-form"
                  className="w-full py-2 font-medium"
                >
                  {translate(auth, "sign_in")}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {translate(auth, "or_with")}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="flex w-full items-center justify-center space-x-2 py-2"
            onClick={handleSignInWithGoogle}
          >
            <GoogleIcon className="size-5" aria-hidden={true} />
            <span className="text-sm font-medium">
              {translate(auth, "with_google")}
            </span>
          </Button>

          <p className="text-pretty mt-4 text-xs text-muted-foreground dark:text-muted-foreground">
            {translate(auth, "you_agree")}{" "}
            <a href="#" className="underline underline-offset-4">
              {translate(auth, "terms")}
            </a>{" "}
            {translate(auth, "and")}{" "}
            <a href="#" className="underline underline-offset-4">
              {translate(auth, "privacy")}
            </a>
            .
          </p>

          <TextLink
            text={translate(auth, "create_new")}
            link={"/create"}
            linkText={translate(auth, "create_title")}
            className={"lowercase"}
          />
        </div>
      </div>
    </div>
  );
}
