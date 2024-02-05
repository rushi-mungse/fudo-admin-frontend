import React from "react";
import { AxisOptions, Chart } from "react-charts";

type DailyStars = {
    date: string;
    stars: number;
};

type Series = {
    label: string;
    data: DailyStars[];
};

const data: Series[] = [
    {
        label: "Chart",
        data: [
            {
                date: "Feb 1",
                stars: 0,
            },
            {
                date: "Feb 2",
                stars: 15,
            },
            {
                date: "Feb 3",
                stars: 20,
            },
            {
                date: "Feb 4",
                stars: 30,
            },
        ],
    },
];

const OrderPerDayAreaChart = () => {
    const primaryAxis = React.useMemo(
        (): AxisOptions<DailyStars> => ({
            getValue: (datum) => datum.date,
            elementType: "area",
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        (): AxisOptions<DailyStars>[] => [
            {
                getValue: (datum) => datum.stars,
                elementType: "area",
            },
        ],
        []
    );

    return (
        <div
            className="shadow rounded-lg bg-white"
            style={{ height: 250, width: 700 }}
        >
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </div>
    );
};

export default OrderPerDayAreaChart;
