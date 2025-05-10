import type { Metadata } from "next"
import CreateProjectForm from "@/components/create-project-form"

export const metadata: Metadata = {
  title: "Create New Project | Event CRM",
  description: "Create a new event project",
}

export default function NewProjectPage() {
  return (
    <div className="container py-6 space-y-8">
      <h1 className="text-2xl font-bold">Create New Project</h1>
      <CreateProjectForm />
    </div>
  )
}
