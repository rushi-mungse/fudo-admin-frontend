import { Card, Col, Row } from "antd";
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks/reduxHooks";
import { MdOutlineAddReaction } from "react-icons/md";
import CountUp from "react-countup";

const DashBoardHomePage = () => {
    const user = useAppSelector((state: RootState) => state.authReducer.user);

    return (
        <div>
            <Card>
                <h1 className="text-xl font-bold">
                    Welcome back {user?.fullName}
                </h1>
            </Card>

            <Row className="mt-8" gutter={8}>
                <Col>
                    <Card
                        style={{ width: 200 }}
                        hoverable
                        className="bg-pink-100 shadow-md shadow-gray/60"
                    >
                        <div className="text-orange-400 font-bold text-lg">
                            <span>Active Orders</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-green-500">
                                <MdOutlineAddReaction size={36} />
                            </span>
                            <CountUp end={123457} />
                        </div>
                        <span>Last 24 hourse</span>
                    </Card>
                </Col>

                <Col>
                    <Card style={{ width: 200 }}></Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashBoardHomePage;
