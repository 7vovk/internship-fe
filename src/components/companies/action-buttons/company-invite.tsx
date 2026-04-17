"use client";

import { ConfirmationModal } from "@/app/components/modal/confirmation-modal";
import { useTranslations } from "next-intl";
import { errorToaster, successToaster } from "@/app/utils";
import { parseErrorMessage } from "@/lib/errors";
import { useRouter } from "next/navigation";
import FormController from "@/components/forms/form-controller";
import { Button } from "@/components/shared/ui";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { handleUserInvitation } from "@/lib/api/invitations";
import { IconEnum } from "@/lib/enums/app.enums";

type CompanyDeleteProps = {
  companyId: string;
  isDisabled?: boolean;
};

export function CompanyInvite({
  companyId,
  isDisabled = false,
}: CompanyDeleteProps) {
  const tCompany = useTranslations("Company");
  const router = useRouter();
  const tGeneral = useTranslations("General");
  const tAuth = useTranslations("Auth");

  const inviteUsersSchema = z.object({
    users: z
      .array(
        z.object({
          email: z.string().trim().email(tGeneral("emailError")),
        }),
      )
      .min(1)
      .superRefine((users, ctx) => {
        const seenEmails = new Map<string, number>();

        users.forEach((user, index) => {
          const normalizedEmail = user.email.toLowerCase();
          const firstIndex = seenEmails.get(normalizedEmail);

          if (firstIndex !== undefined) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [index, "email"],
              message: tGeneral("duplicateEmailError"),
            });
            return;
          }

          seenEmails.set(normalizedEmail, index);
        });
      }),
  });

  const inviteForm = useForm<z.infer<typeof inviteUsersSchema>>({
    resolver: zodResolver(inviteUsersSchema),
    defaultValues: {
      users: [{ email: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: inviteForm.control,
    name: "users",
  });

  async function handleInviteToCompany() {
    const isValid = await inviteForm.trigger(undefined, {
      shouldFocus: true,
    });

    if (!isValid) {
      errorToaster(tGeneral("required"));
      return false;
    }

    try {
      const formData = inviteUsersSchema.parse(inviteForm.getValues());
      const emails: string[] = formData.users.map((user) => user.email);
      await handleUserInvitation(companyId, { emails });
      router.refresh();
      successToaster(tCompany("successInvitation"));
      return true;
    } catch (error) {
      errorToaster(parseErrorMessage(error));
      return false;
    }
  }

  return (
    <ConfirmationModal
      buttonName="invite"
      isDisabled={isDisabled}
      btnClasses="hover:bg-green-600 hover:text-white"
      btnOkClasses="text-black bg-green-300 hover:bg-green-500 hover:text-white"
      title="userInvite"
      description={tCompany("invite")}
      icon={IconEnum.CHECK}
      onConfirm={handleInviteToCompany}
    >
      <form id="invite-users-form" className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-2">
            <div className="flex-1">
              <FormController
                control={inviteForm.control}
                name={`users.${index}.email`}
                label={`${tAuth("email")} ${index + 1}`}
                placeholder={tAuth("emailPlaceholder")}
                autoComplete="off"
              />
            </div>
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove email field ${index + 1}`}
                onClick={() => remove(index)}
              >
                <XIcon />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className={cn("w-full mt-3")}
          onClick={() => append({ email: "" })}
        >
          <PlusIcon />
          {tGeneral("addMore")}
        </Button>
      </form>
    </ConfirmationModal>
  );
}
