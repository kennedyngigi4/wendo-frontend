"use client"

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
]

interface Props {
    data: {
        service: string
        bookings: number
    }[]
}

export default function BookingsByServiceChart({
    data,
}: Props) {

    const total = data.reduce(
        (acc, item) => acc + item.bookings,
        0
    )

    return (
        <div className="flex items-center gap-6">

            <ChartContainer
                config={{}}
                className="mx-auto aspect-square h-[250px]"
            >
                <PieChart>
                    <ChartTooltip
                        content={<ChartTooltipContent />}
                    />

                    <Pie
                        data={data}
                        dataKey="bookings"
                        nameKey="service"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ChartContainer>

            <div className="space-y-3">
                {data.map((item, index) => {
                    const percentage = Math.round(
                        (item.bookings / total) * 100
                    )

                    return (
                        <div
                            key={item.service}
                            className="flex items-center gap-3 text-sm"
                        >
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{
                                    backgroundColor:
                                        COLORS[index % COLORS.length],
                                }}
                            />

                            <div className="flex items-center gap-2">
                                <span>{item.service}</span>

                                <span className="text-muted-foreground">
                                    {item.bookings} ({percentage}%)
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}