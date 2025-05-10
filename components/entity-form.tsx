"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api-utils"

interface EntityFormProps {
  projectId: string
  entity: string
  schema: z.ZodType<any, any>
  fields: React.ReactNode
  defaultValues?: Record<string, any>
  id?: string
  title: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function EntityForm({
  projectId,
  entity,
  schema,
  fields,
  defaultValues = {},
  id,
  title,
  onSuccess,
  onCancel,
}: EntityFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!id

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    setIsSubmitting(true)
    try {
      if (isEditing) {
        await apiClient.update(projectId, entity, id, data)
        toast({
          title: "Updated successfully",
          description: `The ${entity.replace(/-/g, " ")} has been updated.`,
        })
      } else {
        await apiClient.create(projectId, entity, data)
        toast({
          title: "Created successfully",
          description: `The ${entity.replace(/-/g, " ")} has been created.`,
        })
      }

      router.refresh()
      if (onSuccess) onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">{fields}</CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel || (() => router.back())}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
