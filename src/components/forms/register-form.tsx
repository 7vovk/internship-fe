"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site.config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Card, CardContent, Logo, TextLink } from "../shared/ui";
import { createAccountAction } from "./register.server-action";
import { useAuth } from "@/hooks/useAuth.hook";
import { parseErrorMessage } from "@/lib/errors";
import { getRegisterPayloadSchema, getRegisterSchema } from "./auth.schema";
import FormController from "./form-controller";
import { errorToaster } from "@/app/utils";
import { Placeholder } from "@/lib/enums/placeholder.enums";
import { Routes } from "@/config/site.enums";

export default function RegisterForm() {
  const { submitLogin } = useAuth();
  const tAuth = useTranslations(siteConfig.pages.login.translation);
  const tGeneral = useTranslations("General");

  const registerPayloadSchema = getRegisterPayloadSchema(tGeneral);
  const formSchema = getRegisterSchema(tGeneral);

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

      const created = await createAccountAction(payload, tAuth);
      if (!created.ok) {
        errorToaster(created.message);
        return;
      }

      await submitLogin({
        email: payload.email,
        password: payload.password,
        showCreateToast: true,
      });
    } catch (error) {
      errorToaster(parseErrorMessage(error));
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
            {tAuth("createTitle")}
          </h3>
        </div>

        <Card className="mt-4 shadow-2xs sm:mx-auto sm:w-full sm:max-w-md">
          <CardContent>
            <form
              id="create-account-form"
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormController
                control={form.control}
                name="firstName"
                label={tAuth("firstName")}
                placeholder={tAuth("firstNamePlaceholder")}
                autoComplete="off"
              />

              <FormController
                control={form.control}
                name="lastName"
                label={tAuth("lastName")}
                placeholder={tAuth("lastNamePlaceholder")}
                autoComplete="off"
              />

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
                placeholder={Placeholder.PASS}
                autoComplete="off"
              />

              <FormController
                control={form.control}
                name="confirmPassword"
                type="password"
                label={tAuth("passwordConfirm")}
                placeholder={Placeholder.PASS}
                autoComplete="off"
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
          text={tAuth("alreadyHave")}
          link={Routes.LOGIN}
          linkText={tAuth("signIn")}
        />
      </div>
    </div>
  );
}
