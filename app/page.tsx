"use client"
import { EncounterBuilder } from "@/components/encounter-builder"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="pathfinder-theme">
      <div className="min-h-screen bg-background">
        <main className="container mx-auto py-6 px-4 md:px-6">
          <h1 className="text-3xl font-bold text-center mb-6">Pathfinder 2e Encounter Builder</h1>
          <EncounterBuilder />
        </main>
      </div>
    </ThemeProvider>
  )
}
