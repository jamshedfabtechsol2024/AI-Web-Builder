import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatSkeleton() {
  return (
    <Card className="w-full gap-2 border border-[#FFFFFF0F] bg-[#FFFFFF0F] p-0 py-4">
      <CardHeader>
        {/* Title placeholder */}
        <Skeleton className="h-4 w-24 rounded bg-white/10" />
      </CardHeader>
      <CardContent>
        {/* Value placeholder */}
        <Skeleton className="h-8 w-16 rounded bg-white/10" />
      </CardContent>
    </Card>
  );
}
