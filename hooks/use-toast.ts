"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"

type ToastProps = {
  id?: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
}

type Toast = ToastProps & {
  id: string
  createdAt: Date
}

const DEFAULT_TOAST_DURATION = 5000

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts((toasts) => {
        const now = new Date()
        return toasts.filter((toast) => {
          const expiresAt = new Date(toast.createdAt)
          expiresAt.setMilliseconds(expiresAt.getMilliseconds() + (toast.duration || DEFAULT_TOAST_DURATION))
          return expiresAt > now
        })
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const toast = useCallback(({ id, ...props }: ToastProps) => {
    const newId = id || Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id: newId,
      createdAt: new Date(),
      ...props,
    }

    setToasts((toasts) => [...toasts, newToast])
    return newId
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
  }
}

export const toast = (props: ToastProps) => {
  const id = Math.random().toString(36).substring(2, 9)
  // This is a simplified version for direct imports
  // In a real app, you'd use a context or a global state
  console.log(`Toast: ${props.title} - ${props.description}`)
  return id
}
