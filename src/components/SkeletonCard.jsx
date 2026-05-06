export function SkeletonCard() {
    return (
        <div className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded mb-4" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-1/4" />
        </div>
    )
}