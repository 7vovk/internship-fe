import { PageTemplate } from "@/components/shared/page-template";
import { siteConfig } from "@/config/site.config";
import { getTranslations } from "next-intl/server";
import { getCurrentCompanyAction } from "@/components/companies/company.server-action";
import { redirect } from "next/navigation";
import { getCurrentUserCached } from "@/lib/utils";
import {
  BackButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/ui";
import { ItemTemplate } from "@/components/shared/item-template";
import { parseCompanyData } from "@/lib/companies/parse-company-data";
import { Routes } from "@/config/site.enums";
import { resolveBackHref } from "@/app/utils/route.utils";
import { GetCompanyActions } from "@/components/companies/action-buttons/company-action-buttons";
import { ActionButtons } from "@/lib/enums/action-buttons.enums";
import { getAllInvitations } from "@/lib/api/invitations";
import { InvitationType } from "@/lib/enums/invitation.enums";
import { convertDate } from "@/app/utils/date.utils";

export default async function CompanyPage({
  params,
  searchParams,
}: {
  params?: Promise<{ companyId: string }>;
  searchParams?: Promise<{ back?: string }>;
}) {
  const companyId = (await params)!.companyId;
  const resolvedSearchParams = await searchParams;
  const tCompany = await getTranslations(siteConfig.pages.company.translation);
  const companyResult = await getCurrentCompanyAction(companyId);
  const backHref = resolveBackHref(
    Routes.COMPANIES,
    resolvedSearchParams?.back,
  );

  if (!companyResult.ok) {
    redirect(Routes.COMPANIES);
  }

  const selectedCompany = companyResult.company;
  const tGeneral = await getTranslations("General");
  const currentUser = await getCurrentUserCached();
  const isOwner = selectedCompany.ownerId === currentUser?.id;
  const [userRequests, companyInvitation] = isOwner
    ? await Promise.all([
        getAllInvitations(companyId, InvitationType.USER_REQUEST),
        getAllInvitations(companyId, InvitationType.OWNER_INVITE),
      ])
    : [null, null];

  const companyDataMap = parseCompanyData(
    selectedCompany,
    currentUser,
    tGeneral,
  );

  const renderInvitationTable = (
    title: string,
    rows: {
      id: string;
      email: string;
      status: string;
      type: string;
      createDate: string;
      updateDate: string;
    }[],
  ) => (
    <section className="rounded-lg border bg-card w-full">
      <div className="border-b px-4 py-3">
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b hover:bg-transparent">
            <TableHead className="h-12 px-4 font-medium">Email</TableHead>
            <TableHead className="h-12 px-4 font-medium">Type</TableHead>
            <TableHead className="h-12 px-4 font-medium">Status</TableHead>
            <TableHead className="h-12 px-4 font-medium">Created</TableHead>
            <TableHead className="h-12 px-4 font-medium">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell className="h-14 px-4">{invite.email}</TableCell>
                <TableCell className="h-14 px-4">{invite.type}</TableCell>
                <TableCell className="h-14 px-4">{invite.status}</TableCell>
                <TableCell className="h-14 px-4">
                  {convertDate(invite.createDate, "dd/mm/yyyy, HH:MM:ss")}
                </TableCell>
                <TableCell className="h-14 px-4">
                  {convertDate(invite.updateDate, "dd/mm/yyyy, HH:MM:ss")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-20 px-4 text-center text-muted-foreground hover:bg-transparent"
              >
                {tGeneral("noRecords")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );

  return (
    <PageTemplate
      translator={tCompany}
      title={tCompany("title", { name: selectedCompany.name })}
    >
      <div className="flex justify-start">
        <BackButton href={backHref} />
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {companyDataMap.map((field) => {
          return (
            <ItemTemplate
              key={field.key}
              title={field.key}
              description={field.value}
            />
          );
        })}
      </ul>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <GetCompanyActions
          showActions={[ActionButtons.ALL]}
          company={selectedCompany}
          variant="panel"
          wrapperClassName="justify-end sm:col-start-2 lg:col-start-3 xl:col-start-4"
        />
      </div>
      {isOwner && (
        <div className="grid grid-cols-1 gap-6">
          {renderInvitationTable(
            tCompany("invitedUsers"),
            companyInvitation?.data ?? [],
          )}
          {renderInvitationTable(
            tCompany("userRequests"),
            userRequests?.data ?? [],
          )}
        </div>
      )}
    </PageTemplate>
  );
}
