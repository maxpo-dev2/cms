/**
 * Utility functions for API calls
 */

// Generic fetch function with error handling
export async function fetchData(url: string, options?: RequestInit) {
    try {
      const response = await fetch(url, options)
  
      if (!response.ok) {
        // Try to parse error message from response
        try {
          const errorData = await response.json()
          throw new Error(errorData.error || `API error: ${response.status}`)
        } catch (e) {
          throw new Error(`API error: ${response.status}`)
        }
      }
  
      return await response.json()
    } catch (error) {
      console.error("API fetch error:", error)
      throw error
    }
  }
  
  // CRUD operations for any entity
  export const apiClient = {
    // Get all items
    getAll: async (projectId: string, entity: string) => {
      return fetchData(`/api/projects/${projectId}/${entity}`)
    },
  
    // Get single item
    getById: async (projectId: string, entity: string, id: string) => {
      return fetchData(`/api/projects/${projectId}/${entity}/${id}`)
    },
  
    // Create new item
    create: async (projectId: string, entity: string, data: any) => {
      return fetchData(`/api/projects/${projectId}/${entity}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    },
  
    // Update existing item
    update: async (projectId: string, entity: string, id: string, data: any) => {
      return fetchData(`/api/projects/${projectId}/${entity}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    },
  
    // Delete item
    delete: async (projectId: string, entity: string, id: string) => {
      return fetchData(`/api/projects/${projectId}/${entity}/${id}`, {
        method: "DELETE",
      })
    },
  }
  
  // Format date for API requests
  export function formatDateForApi(date: Date | string | null | undefined): string | null {
    if (!date) return null
  
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toISOString()
  }
  
  // Format date for display
  export function formatDateForDisplay(date: Date | string | null | undefined): string {
    if (!date) return ""
  
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  
  // Format date and time for display
  export function formatDateTimeForDisplay(date: Date | string | null | undefined): string {
    if (!date) return ""
  
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  