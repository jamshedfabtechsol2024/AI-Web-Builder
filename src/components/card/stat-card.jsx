import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCard({ title, value }) {
  return (
    <Card className="w-full gap-2 border border-[#FFFFFF0F] bg-[#FFFFFF0F] p-0 py-4">
      <CardHeader>
        <CardTitle className="!text-[#9CA3AF] font-medium text-base text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-[#F3F4F6] text-lg tracking-tight lg:text-3xl">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
