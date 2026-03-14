export default function ShimmerLoader() {
  return (
    <div className="space-y-4 p-6">
      <div className="h-8 w-3/4 rounded-md animate-shimmer" />
      <div className="h-4 w-1/2 rounded-md animate-shimmer" />
      <div className="mt-6 space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border border-border p-4 space-y-2">
            <div className="h-4 w-1/3 rounded animate-shimmer" />
            <div className="h-3 w-full rounded animate-shimmer" />
            <div className="h-3 w-5/6 rounded animate-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
