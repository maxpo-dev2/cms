import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import CampaignForm from "../../components/campaign-form"
  
  export default function NewCampaignPage({ params }) {
    return (
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/projects/${params.id}`}>Project</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/projects/${params.id}/marketing`}>Marketing</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>New Campaign</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
  
        <div className="grid gap-6">
          <CampaignForm projectId={params.id} />
        </div>
      </div>
    )
  }
  