"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site.config";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleIcon } from "../shared/google.icon";
import { Button, Card, CardContent, Separator, TextLink } from "../shared/ui";
import { useAuth } from "@/hooks/useAuth.hook";
import { getLoginSchema } from "./auth.schema";
import FormController from "./form-controller";

export default function LoginForm() {
  const { submitLogin } = useAuth();
  const tAuth = useTranslations(siteConfig.pages.login.translation);

  const formSchema = getLoginSchema(tAuth);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
            {tAuth("description")}
          </h2>
          <Card className="mt-4 shadow-2xs sm:mx-auto sm:w-full sm:max-w-md">
            <CardContent>
              <form
                id="login-form"
                onSubmit={form.handleSubmit(() =>
                  submitLogin(form.getValues()),
                )}
                className="mt-6 space-y-4"
              >
                <FormController
                  control={form.control}
                  name="email"
                  label={tAuth("email")}
                  placeholder={tAuth("emailPlaceholder")}
                  autoComplete="off"
                />
                <FormController
                  control={form.control}
                  name="password"
                  type="password"
                  label={tAuth("password")}
                  placeholder={"**************"}
                  autoComplete="off"
                />

                <Button
                  type="submit"
                  form="login-form"
                  className="w-full py-2 font-medium"
                >
                  {tAuth("signIn")}
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
                {tAuth("orWith")}
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
            <span className="text-sm font-medium">{tAuth("withGoogle")}</span>
          </Button>

          <p className="text-pretty mt-4 text-xs text-muted-foreground dark:text-muted-foreground">
            {tAuth("youAgree")}{" "}
            <a href="#" className="underline underline-offset-4">
              {tAuth("terms")}
            </a>{" "}
            {tAuth("and")}{" "}
            <a href="#" className="underline underline-offset-4">
              {tAuth("privacy")}
            </a>
            .
          </p>

          <TextLink
            text={tAuth("createNew")}
            link={"/create"}
            linkText={tAuth("createTitle")}
            className={"lowercase"}
          />
        </div>
      </div>
    </div>
  );
}
