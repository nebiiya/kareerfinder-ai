"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Palette,
  Code2,
  Database,
  ShieldCheck,
  BrainCircuit,
  Briefcase,
  Globe,
  ArrowRight,
} from "lucide-react"

const INTERESTS = [
  { id: "design", label: "Design", icon: Palette },
  { id: "coding", label: "Coding", icon: Code2 },
  { id: "data", label: "Data", icon: Database },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "ai", label: "AI", icon: BrainCircuit },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "web", label: "Web Development", icon: Globe },
]

const LEVELS = ["Beginner", "Intermediate"]

export function CareerFinder() {
  const [selected, setSelected] = useState<string[]>([])
  const [level, setLevel] = useState(0)
  const [activities, setActivities] = useState("")

  const toggleInterest = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Generating career path:", { interests: selected, level: LEVELS[level], activities })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <div className="w-full max-w-xl">
        {/* Header */}
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="size-6" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">KareerFinder AI</h1>
          <p className="mt-2 text-base text-muted-foreground">Start your tech journey here</p>
        </header>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          {/* Interests */}
          <fieldset className="mb-8">
            <legend className="mb-3 text-sm font-medium">What are you interested in?</legend>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(({ id, label, icon: Icon }) => {
                const active = selected.includes(id)
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleInterest(id)}
                    aria-pressed={active}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary text-secondary-foreground hover:border-primary/40"
                    }`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* Experience slider */}
          <fieldset className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <legend className="text-sm font-medium">How much experience do you have?</legend>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {LEVELS[level]}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={1}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              aria-label="Experience level"
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              {LEVELS.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </fieldset>

          {/* Activities textarea */}
          <div className="mb-8">
            <label htmlFor="activities" className="mb-3 block text-sm font-medium">
              What activities do you enjoy?
            </label>
            <textarea
              id="activities"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              rows={4}
              placeholder="ex: I like solving logic problems, building websites, coding, and working with data"
              className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full rounded-full">
            Generate My Career Path
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </form>
      </div>
    </main>
  )
}
