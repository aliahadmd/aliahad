export default function Skeleton() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="animate-pulse space-y-4">
        {/* Header skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

        {/* Content skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        {/* Image skeleton */}
        <div className="flex-1 space-y-4 py-1">
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
}
