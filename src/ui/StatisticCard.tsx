import CountUp from "react-countup";
import Icon from "@ant-design/icons";
import { DownArrowIcon, UpArrowIcon } from "../icons";

interface PropType {
    StatisticIcon:
        | React.ComponentType<React.SVGProps<SVGSVGElement>>
        | undefined;
    title: string;
    value: number;
    isIncreament: boolean;
    percentageValue: number;
    lastDays: number;
}

const StatisticCard = ({
    StatisticIcon,
    value,
    title,
    percentageValue,
    lastDays,
    isIncreament,
}: PropType) => {
    return (
        <div
            style={{ width: 275, height: 132 }}
            className="flex items-center justify-center gap-8 shadow bg-white rounded-lg"
        >
            <div className="h-[85px] w-[85px] rounded-full bg-activeLight flex items-center justify-center">
                <Icon component={StatisticIcon} />
            </div>

            <div>
                <h1 className="text-3xl font-bold">
                    <CountUp end={value} />
                </h1>

                <p className="text-gray/80 text-sm">{title}</p>

                <div className="flex items-center justify-center gap-2">
                    <span className="bg-activeLight flex items-center justify-center rounded-full h-5 w-5 p-[2px]">
                        <Icon
                            component={
                                isIncreament ? UpArrowIcon : DownArrowIcon
                            }
                        />
                    </span>
                    <span className="text-gray/50 text-sm">
                        {percentageValue}% ({lastDays} days)
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatisticCard;
