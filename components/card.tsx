"use client"

import type React from "react"

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`relative flex w-full flex-col overflow-hidden rounded-lg border border-border bg-card p-4 ${className}`}
  >
    {children}
  </div>
)

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-between ${className}`}>{children}</div>
)

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-medium ${className}`}>{children}</h3>
)

export const CardDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
)

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`mt-4 flex flex-col space-y-4 ${className}`}>{children}</div>
)

export const BarChart = () => <></>
export const LineChart = () => <></>

