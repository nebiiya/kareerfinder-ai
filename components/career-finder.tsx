"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

const INTERESTS = [
  { id: "design", label: "Design", icon: Palette },
  { id: "coding", label: "Coding", icon: Code2 },
  { id: "data", label: "Data", icon: Database },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "ai", label: "AI", icon: BrainCircuit },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "web", label: "Web Development", icon: Globe },
];

const LEVELS = ["Beginner", "Intermediate"];

export function CareerFinder() {
  const [selected, setSelected] = useState<string[]>([]);
  const [level, setLevel] = useState(0);
  const [activities, setActivities] = useState("");

  // Add new states to handle the backend connection
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState(null);

  const generateCareerPath = async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Package the user's inputs to match what our route.ts expects
        body: JSON.stringify({
          interests: selected,
          experience: LEVELS[level],
          activities: activities,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setResults(data.recommendations);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInterest = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateCareerPath(); // Trigger the API call
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <div className="w-full max-w-xl">
        {/* Header */}
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="size-6" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            KareerFinder AI
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Start your tech journey here
          </p>
        </header>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          {/* Interests */}
          <fieldset className="mb-8">
            <legend className="mb-3 text-sm font-medium">
              What are you interested in?
            </legend>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(({ id, label, icon: Icon }) => {
                const active = selected.includes(id);
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
                );
              })}
            </div>
          </fieldset>

          {/* Experience slider */}
          <fieldset className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <legend className="text-sm font-medium">
                How much experience do you have?
              </legend>
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
            <label
              htmlFor="activities"
              className="mb-3 block text-sm font-medium"
            >
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
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full"
            disabled={isLoading}
          >
            {isLoading ? "Analying your path..." : "Generate My Career Path"}
            {!isLoading && <ArrowRight className="size-4" aria-hidden="true" />}
          </Button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        {/* AI Results */}
        {results && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-semibold tracking-tight text-center">
              Your Recommended Paths
            </h2>

            {/* We map through the array of recommendations from Gemini */}
            {results.map((roleInfo: any, index: number) => (
              <div
                key={index}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-primary">
                  {roleInfo.role}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Why it fits:</strong>{" "}
                  {roleInfo.why_it_fits}
                </p>

                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    3-Month Roadmap:
                  </h4>
                  <ul className="space-y-2">
                    {roleInfo.roadmap_3_months.map(
                      (step: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="text-primary">•</span> {step}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="mt-5 pt-5 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Local PH Resources:
                  </h4>
                  <ul className="space-y-2">
                    {roleInfo.ph_resources.map(
                      (resource: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="text-primary">→</span> {resource}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
