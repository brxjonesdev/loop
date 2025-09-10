import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";
import AuthButton from "@/lib/auth/components/auth-button";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 space-y-6">
      {/* Header */}
      <header className="py-4 flex flex-row items-center">
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold font-heading dark:text-white">Loop</h1>
        </div>
        <div>
          <AuthButton/>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-t from-cyan-200 to-cyan-500 dark:from-fuchsia-600 dark:to-pink-600 text-white rounded-3xl">
        <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 font-heading max-w-3xl">
            Build Better Habits, Achieve Your Goals
          </h2>
          <p className="text-sm md:text-base mb-6 max-w-2xl font-body">
            Loop combines daily habit tracking with mindful journaling to help you stay consistent 
            with your goals. Track progress, reflect on your journey, and build the life you want—one 
            day at a time.
          </p>
          <div className="flex gap-4 w-full max-w-sm">{/* <LoginButton /> */}</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="grid rounded-3xl grid-cols-1 lg:grid-cols-2 gap-8 items-center font-body">
          <img
            src="/placeholder.svg"
            className="bg-muted rounded-md aspect-video block lg:hidden"
            alt="Loop Habit Tracking App"
          />

          <article className="flex flex-col gap-8">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl lg:text-3xl tracking-tight max-w-lg text-left font-heading">
                Your Daily Success Companion
              </h2>
              <p className="text-base leading-relaxed tracking-normal text-muted-foreground max-w-lg text-left">
                Loop helps you build lasting habits and achieve your goals through consistent 
                daily actions and thoughtful reflection.
              </p>
            </header>

            <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5 lg:pl-4">
              {[
                {
                  title: "Daily Habit Tracking",
                  description: "Mark off habits and watch your streaks grow over time.",
                },
                {
                  title: "Goal-Focused Journaling",
                  description: "Reflect on progress and stay motivated with purposeful writing.",
                },
                {
                  title: "Progress Insights",
                  description: "Visualize your consistency and celebrate your wins.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 items-start">
                  <Check className="w-4 h-4 mt-1 text-primary" />
                  <div className="flex flex-col gap-1">
                    <p className="text-cyan-500 dark:text-purple-300 font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <img
            src="/placeholder.svg"
            className="bg-muted rounded-md aspect-video hidden lg:block"
            alt="Loop Habit Tracking App"
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-body py-8">
        <article className="flex flex-col gap-3 items-start">
          <Badge className="bg-cyan-500 dark:bg-purple-300">
            The Power of Daily Habits
          </Badge>
          <header className="flex flex-col gap-2">
            <h2 className="text-lg md:text-2xl lg:text-3xl tracking-tight lg:max-w-lg font-heading font-medium text-left">
              Transform Your Life Through Consistency
            </h2>
            <p className="text-base lg:max-w-sm leading-relaxed tracking-normal text-muted-foreground text-left">
              Loop makes it easy to build and maintain the habits that matter most to your goals, 
              with reflection tools to keep you motivated and on track.
            </p>
          </header>
        </article>

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4 text-left">
            {[
              {
                title: "Habit Momentum",
                description:
                  "Build powerful streaks that create lasting change and keep you motivated daily.",
              },
              {
                title: "Goal Alignment",
                description:
                  "Connect your daily actions to your bigger aspirations and see real progress.",
              },
              {
                title: "Reflective Growth",
                description:
                  "Learn from your journey with guided prompts and insightful progress tracking.",
              },
              {
                title: "Sustainable Change",
                description:
                  "Create lasting transformation through small, consistent actions that compound over time.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-2 justify-between p-5 rounded-md border-2"
              >
                <h3 className="text-xl font-heading font-medium tracking-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed tracking-normal text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative h-16 bg-gradient-to-t from-cyan-200 to-cyan-500 dark:from-fuchsia-600 dark:to-pink-600 text-white rounded-t-3xl">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[98%] h-[85%] bg-background rounded-t-3xl flex justify-between items-center flex-wrap px-10 font-body text-black dark:text-white">
          <p className="font-heading text-sm lg:text-lg font-bold">Loop</p>
          <p className="text-xs">
            Created with love by{" "}
            <Link href="" className="text-cyan-300 dark:text-fuchsia-600 underline">
              brxjonesdev
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}