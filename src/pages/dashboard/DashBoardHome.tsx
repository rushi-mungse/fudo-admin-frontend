import { DatePicker, Flex, Typography } from "antd";
import Icon from "@ant-design/icons";
import { RootState } from "../../store";
import { StatisticCard } from "../../ui";
import { useAppSelector } from "../../hooks/reduxHooks";
import {
    CanceledOrderIcon,
    DeliveredIcon,
    FilterIcon,
    RevenueIcon,
    TotalOrdersIcon,
} from "../../icons";

import OrderPerDayAreaChart from "../../charts/OrderPerDayAreaChart";
import UserPerDayBarChart from "../../charts/UserPerDayBarChart";

const { RangePicker } = DatePicker;

const DashBoardHomePage = () => {
    const user = useAppSelector((state: RootState) => state.authReducer.user);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold p-0 m-0 tracking-wider">
                        Dashboard
                    </h1>
                    <Typography.Text className="text-gray/60">
                        Hi, {user?.fullName}. Welcome back to fudo admin
                        dashboard.
                    </Typography.Text>
                </div>
                <div className="shadow p-3 rounded-md flex items-center justify-center gap-4 bg-white">
                    <Icon component={FilterIcon} />
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold tracking-wider pl-2 m-0">
                            Filter Period
                        </h1>
                        <RangePicker variant="borderless" />
                    </div>
                </div>
            </div>

            <Flex wrap="wrap" gap="large" className="mt-8">
                <StatisticCard
                    value={75}
                    isIncreament
                    lastDays={30}
                    percentageValue={4}
                    StatisticIcon={TotalOrdersIcon}
                    title="Total Orders"
                />

                <StatisticCard
                    value={400}
                    isIncreament
                    lastDays={30}
                    percentageValue={21}
                    StatisticIcon={DeliveredIcon}
                    title="Total Delivered"
                />

                <StatisticCard
                    value={10}
                    isIncreament={false}
                    lastDays={30}
                    percentageValue={1}
                    StatisticIcon={CanceledOrderIcon}
                    title="Total Canceled"
                />

                <StatisticCard
                    value={15}
                    isIncreament
                    lastDays={30}
                    percentageValue={8}
                    StatisticIcon={RevenueIcon}
                    title="Total Revenue"
                />
            </Flex>

            <div className="flex items-center justify-between mt-10">
                <OrderPerDayAreaChart />
                <UserPerDayBarChart />
            </div>
        </div>
    );
};

export default DashBoardHomePage;
