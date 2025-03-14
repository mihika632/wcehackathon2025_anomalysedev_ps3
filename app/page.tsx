import Link from "next/link"
import { ArrowRight, Brain, LineChart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WordCloud } from "@/components/word-cloud"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-premium-dark-900 via-premium-dark-950 to-premium-dark-900" />
        <div className="container relative">
          <div className="grid min-h-[calc(100vh-4rem)] gap-8 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col items-start justify-center pt-20 lg:pt-0">
              <div className="inline-flex items-center rounded-lg bg-premium-fuchsia-500/10 px-3 py-1 text-sm text-premium-fuchsia-300 backdrop-blur">
                <Sparkles className="mr-2 h-4 w-4" />
                Powered by Advanced AI
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tighter text-premium-indigo-50 sm:text-5xl md:text-6xl lg:text-7xl">
                Real-Time Anomaly Detection
              </h1>
              <p className="mt-4 max-w-[600px] text-lg text-premium-indigo-200 md:text-xl">
                Ever wonder if your data is trying to tell you something important? Our platform helps you spot unusual
                patterns in real-time, so you can take swift action and keep your operations running smoothly.
              </p>
              <div className="mt-8 flex flex-col gap-4 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-premium-fuchsia-500 to-premium-indigo-600 text-white hover:from-premium-fuchsia-600 hover:to-premium-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-premium-fuchsia-500/25"
                  asChild
                >
                  <Link href="/dashboard">
                    View Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-premium-indigo-700 text-premium-indigo-200 hover:bg-premium-fuchsia-500/10 hover:text-premium-fuchsia-300 hover:border-premium-fuchsia-500"
                >
                  Explore Models
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <WordCloud />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-premium-indigo-50 sm:text-4xl">Advanced AI Features</h2>
          <p className="mt-4 text-lg text-premium-indigo-200">
            Combine real-time data with historical trends to see the bigger picture.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-lg border border-premium-indigo-800/20 bg-premium-dark-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-premium-dark-900/80 hover:shadow-xl hover:shadow-premium-fuchsia-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-premium-fuchsia-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-premium-fuchsia-500/20 to-premium-indigo-500/20 transition-colors group-hover:from-premium-fuchsia-500/30 group-hover:to-premium-indigo-500/30">
                  <feature.icon className="h-6 w-6 text-premium-fuchsia-400" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-premium-indigo-50">{feature.name}</h3>
                <p className="mt-2 text-premium-indigo-200">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    name: "Live Monitoring",
    description: "Get immediate alerts whenever something looks off",
    icon: Brain,
  },
  {
    name: "Scalable & Secure",
    description: "Designed to grow with your needs, whether you’re tracking a handful of sensors or a global network",
    icon: LineChart,
  },
  {
    name: "Anomaly Detection",
    description: "Automatically detect and alert on model performance anomalies",
    icon: Sparkles,
  },
]

