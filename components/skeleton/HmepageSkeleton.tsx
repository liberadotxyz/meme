// import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export function TradeComponentSkeleton() {
  return (
    <div className="flex flex-col items-center justify-items-center gap-0">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="p-2 w-full max-w-3xl gap-0">
          <TradingCardSkeleton />
          <TokenCardSkeleton />
        </div>
      ))}
    </div>
  );
}

 function TradingCardSkeleton() {
  return (
    <Card className="p-4 mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-6 w-[80px] mt-2" />
        </div>
      </div>
    </Card>
  );
}

 function TokenCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[60px]" />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="h-3 w-3 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-3 w-[100px] mt-1" />
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="h-4 w-10" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-3 w-[60px]" />
          </div>
          <Skeleton className="h-6 w-[80px] mt-2" />
        </div>
      </div>
    </Card>
  );
}