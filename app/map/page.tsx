import WorldMap from "@/components/world-map"

export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-premium-blue-900 dark:text-premium-blue-50">
        MAP WITH SITE LOCATIONS
      </h1>
      <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
        <WorldMap />
      </div>
    </div>
  )
}