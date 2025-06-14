"use server"

/**
 * Updates general project settings
 */
export async function updateProjectSettings(projectId, formData) {
  const data = {
    name: formData.get("project-name"),
    year: formData.get("project-year"),
    venue: formData.get("project-venue"),
    website: formData.get("project-website"),
    currency: formData.get("project-currency"),
    description: formData.get("project-description"),
    startDate: formData.get("project-start-date") || null,
    endDate: formData.get("project-end-date") || null,
  }

  try {
    // Use fetch with absolute URL to ensure it works in all environments
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/projects/${projectId}/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to update project settings")
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating project:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Updates project branding settings
 */
export async function updateBrandingSettings(projectId, formData) {
  const data = {
    image: formData.get("project-logo"),
    primaryColor: formData.get("primary-color"),
    secondaryColor: formData.get("secondary-color"),
  }

  try {
    // Use fetch with absolute URL to ensure it works in all environments
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/projects/${projectId}/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to update branding settings")
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating branding:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Updates project integration settings
 */
export async function updateIntegrationSettings(projectId, formData) {
  const data = {
    googleAnalyticsId: formData.get("google-analytics"),
    mailchimpApiKey: formData.get("mailchimp-api"),
    stripeApiKey: formData.get("stripe-api"),
  }

  try {
    // Use fetch with absolute URL to ensure it works in all environments
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/projects/${projectId}/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to update integration settings")
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating integrations:", error)
    return { success: false, error: error.message }
  }
}
