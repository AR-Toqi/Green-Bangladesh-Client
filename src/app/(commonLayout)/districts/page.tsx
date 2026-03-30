export default function DistrictsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight">Bangladesh Districts</h1>
      <p className="text-muted-foreground mt-2">Explore tree density across all 64 districts.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* District cards will go here */}
        <div className="rounded-lg border p-6 shadow-sm">
          <h3 className="font-semibold text-lg">Dhaka</h3>
          <p className="text-sm text-muted-foreground">Central Division</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-600 rounded">Red Zone</span>
            <span className="text-sm font-bold">Score: 24/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
