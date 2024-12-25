"use client";

import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors">
      <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-sm z-50 px-4">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">CSA</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <main className="container flex min-h-screen flex-col items-center justify-center gap-4 pb-8 pt-16 md:gap-10">
        <div className="flex max-w-[980px] flex-col items-center gap-4">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
            Open-Source Customer Service
          </h1>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            Watch as our agent network handles support through voice and screen
            sharing, working together 24/7 to solve customer issues.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-2xl font-bold">
                Powered by Gemini Stream API
              </h2>
              <p className="text-muted-foreground">
                Experience the future of customer support with AI-enhanced
                assistance
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/agents">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="https://github.com/bhavesh-songara/csa" target="_blank">
            <Button size="lg" variant="outline">
              <Github className="w-4 h-4" />
              <span>Github</span>
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0 px-4">
        <div className="container flex h-14 items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CSA. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
