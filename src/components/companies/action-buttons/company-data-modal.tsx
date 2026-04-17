"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import FormController from "@/components/forms/form-controller";
import { useTranslations } from "next-intl";
import { Company, ServerActionResult } from "@/lib/interfaces";
import { errorToaster } from "@/app/utils";
import { parseErrorMessage } from "@/lib/errors";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { siteConfig } from "@/config/site.config";
import { getCompanyDataSchema } from "@/components/forms/company.schema";
import {
  createCompanyAction,
  updateCompanyAction,
} from "@/components/companies/company.server-action";
import { Field, FieldLabel, Toggle } from "@/components/shared/ui";
import { Placeholder } from "@/lib/enums/placeholder.enums";
import { cn } from "@/lib/utils";
import { IconEnum } from "@/lib/enums/app.enums";

interface CompanyDataModalProps {
  company?: Company;
  buttonClassName?: string;
}

export function CompanyDataModal({
  company,
  buttonClassName,
}: CompanyDataModalProps) {
  const tCompanies = useTranslations(siteConfig.pages.companies.translation);
  const tGeneral = useTranslations("General");

  const formDescription = company ? "update" : "createCompany";
  const icon = company ? IconEnum.WARNING : null;
  const okButtonText = company ? "update" : "create";
  const companyFormSchema = getCompanyDataSchema(tGeneral);

  const form = useForm<
    z.input<typeof companyFormSchema>,
    unknown,
    z.output<typeof companyFormSchema>
  >({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: company?.name ?? "",
      description: company?.description ?? "",
      website: company?.website ?? "",
      address: company?.address ?? "",
      phone: company?.phone ?? "",
      isVisibleForAll: company?.isVisibleForAll ?? true,
    },
  });

  async function handleCompanyDataSet() {
    const isValid = await form.trigger(undefined, { shouldFocus: true });

    if (!isValid) {
      errorToaster(tGeneral("required"));
      return false;
    }

    try {
      const data: ServerActionResult = company
        ? await updateCompanyAction(company.id, form.getValues())
        : await createCompanyAction(form.getValues());
      if (!data.ok) {
        errorToaster(data.message);
        return false;
      }
    } catch (error) {
      errorToaster(parseErrorMessage(error));
      return false;
    }
  }

  return (
    <div className="flex justify-end">
      <ConfirmationModal
        buttonName={formDescription}
        icon={icon}
        btnClasses={cn("hover:bg-yellow-500 hover:text-white", buttonClassName)}
        btnOkClasses="text-black bg-yellow-300 hover:bg-yellow-500 hover:text-white"
        okBtn={okButtonText}
        title={formDescription}
        onConfirm={handleCompanyDataSet}
        onCancel={() => form.clearErrors()}
      >
        <form id="create-company-form" className="space-y-4">
          <FormController
            control={form.control}
            name="name"
            label={tCompanies("name")}
            placeholder={tCompanies("company")}
            autoComplete="off"
          />

          <FormController
            control={form.control}
            name="description"
            label={tCompanies("fieldDescription")}
            placeholder={tCompanies("fieldDescription")}
            autoComplete="off"
          />

          <FormController
            control={form.control}
            name="website"
            label={tCompanies("website")}
            placeholder={Placeholder.WEB}
            autoComplete="off"
          />

          <FormController
            control={form.control}
            name="address"
            label={tCompanies("address")}
            placeholder={tCompanies("address")}
            autoComplete="off"
          />

          <FormController
            control={form.control}
            name="phone"
            label={tCompanies("phone")}
            placeholder={Placeholder.PHONE}
            autoComplete="off"
          />

          <Controller
            control={form.control}
            name="isVisibleForAll"
            render={({ field }) => (
              <Field orientation="horizontal" className="items-center">
                <FieldLabel
                  htmlFor={field.name}
                  className={cn("cursor-pointer")}
                >
                  {tCompanies("isVisibleForAll")}
                </FieldLabel>
                <Toggle
                  id={field.name}
                  checked={Boolean(field.value)}
                  onCheckedChange={field.onChange}
                />
              </Field>
            )}
          />
        </form>
      </ConfirmationModal>
    </div>
  );
}
