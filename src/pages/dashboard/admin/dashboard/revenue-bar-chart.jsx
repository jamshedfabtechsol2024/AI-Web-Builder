import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-[var(--chart-border)] bg-[var(--chart-bg)] px-3 py-2 text-[var(--text)] text-sm shadow-lg">
        {payload.map((entry) => (
          <div
            className="flex items-center justify-between gap-4"
            key={`item-${entry.name}-${entry.value}`}
          >
            <span
              className="flex items-center gap-2"
              style={{ color: entry.color }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-medium">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

const chartConfig = {
  starter: {
    label: "Starter",
    color: "#3A06D5",
  },
  builder: {
    label: "Builder",
    color: "#A587FF",
  },
  professional: {
    label: "Professional",
    color: "#6EE7B7",
  },
  enterprise: {
    label: "Enterprise",
    color: "#FACC15",
  },
};

export default function RevenueBarChart({ data }) {
  return (
    <Card className="w-full border border-[#FFFFFF0F] bg-[#FFFFFF0F] p-4">
      <CardHeader className="p-0">
        <CardTitle>
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <p>Subscription Revenue</p>
            <div className="flex flex-wrap gap-4">
              {Object.entries(chartConfig).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="rounded-full p-[6px]"
                    style={{ backgroundColor: cfg.color }}
                  />
                  <p className="font-light text-sm">{cfg.label}</p>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="!p-0">
        <ChartContainer className="!p-0 w-full" config={chartConfig}>
          <BarChart
            data={data}
            margin={{ top: 16, right: 16, left: 0, bottom: 8 }}
          >
            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis axisLine={false} dataKey="month" tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <ChartTooltip content={<CustomTooltip />} cursor={false} />

            <Bar
              barSize={20}
              dataKey="starter"
              fill={chartConfig.starter.color}
              stackId="revenue"
            />
            <Bar
              barSize={20}
              dataKey="builder"
              fill={chartConfig.builder.color}
              stackId="revenue"
            />
            <Bar
              barSize={20}
              dataKey="professional"
              fill={chartConfig.professional.color}
              stackId="revenue"
            />
            <Bar
              barSize={20}
              dataKey="enterprise"
              fill={chartConfig.enterprise.color}
              stackId="revenue"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
