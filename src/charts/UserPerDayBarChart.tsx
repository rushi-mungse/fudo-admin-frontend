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

const UserPerDayBarChart = () => {
    const primaryAxis = React.useMemo(
        (): AxisOptions<DailyStars> => ({
            getValue: (datum) => datum.date,
            elementType: "bar",
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        (): AxisOptions<DailyStars>[] => [
            {
                getValue: (datum) => datum.stars,
                elementType: "bar",
            },
        ],
        []
    );

    return (
        <div
            className="shadow bg-white rounded-lg"
            style={{ width: 400, height: 250 }}
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

export default UserPerDayBarChart;
