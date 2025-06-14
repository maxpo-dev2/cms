"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createUtm(formData) {
  const projectId = formData.get("projectId")
  const websiteUrl = formData.get("websiteUrl")
  const source = formData.get("source")
  const medium = formData.get("medium")
  const campaign = formData.get("campaign")
  const term = formData.get("term")
  const content = formData.get("content")

  if (!projectId || !websiteUrl || !source || !medium || !campaign) {
    throw new Error("Missing required fields")
  }

  try {
    // In a real implementation, you would save to the database here
    // For now, we'll just simulate a successful save

    // Simulate database operation
    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath(`/projects/${projectId}/utm`)
    redirect(`/projects/${projectId}/utm`)
  } catch (error) {
    console.error("Error creating UTM data:", error)
    throw new Error("Failed to create UTM data")
  }
}

export async function deleteUtm(utmId, projectId) {
  if (!utmId || !projectId) {
    throw new Error("Missing required fields")
  }

  try {
    // In a real implementation, you would delete from the database here
    // For now, we'll just simulate a successful delete

    // Simulate database operation
    await new Promise((resolve) => setTimeout(resolve, 500))

    revalidatePath(`/projects/${projectId}/utm`)
    return { success: true }
  } catch (error) {
    console.error("Error deleting UTM data:", error)
    throw new Error("Failed to delete UTM data")
  }
}
