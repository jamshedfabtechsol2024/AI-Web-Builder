import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

export const description = "A user growth line chart";

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-[var(--chart-border)] bg-[var(--chart-bg)] px-3 py-2 text-[var(--text)] text-sm shadow-lg">
        {" "}
        <p> {payload[0].value}</p>{" "}
      </div>
    );
  }
  return null;
}

export function LineChartGraph({ data = [] }) {
  const chartConfig = {
    count: {
      label: "count",
      color: "#4000FF",
    },
  };

  return (
    <Card className="w-full border border-[#FFFFFF0F] bg-[#FFFFFF0F] p-4">
      <CardHeader className="p-0">
        <CardTitle className="!m-0 !p-0">User Growth Over Time</CardTitle>
      </CardHeader>
      <CardContent className="!p-0">
        <ChartContainer className="!p-0 w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 16,
              right: 12,
              left: 0, // fully flush with left side
              bottom: 10,
            }}
          >
            <CartesianGrid horizontal={false} vertical={false} />

            <XAxis
              axisLine={false}
              dataKey="month"
              tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              tickMargin={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              domain={[0, "dataMax + 5"]} // ✅ prevent line from going below X-axis
              padding={{ top: 10, bottom: 15 }} // ✅ gives breathing space
            />

            <ChartTooltip content={<CustomTooltip />} cursor={false} />

            <Line
              dataKey="count"
              dot={{ r: 5, strokeWidth: 2, fill: "#4000FF" }} // bigger dots
              stroke="#4000FF"
              strokeWidth={3}
              type="natural"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
