import { Skeleton } from "@workspace/ui/components/skeleton"

export const RepoCardSkeleton = () => {
    return (
      <div className="flex items-center justify-between bg-[#121212] px-2.5 py-1.5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
  
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
      </div>
    )
  }
  