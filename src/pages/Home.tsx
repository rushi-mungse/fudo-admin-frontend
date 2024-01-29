import { Button } from "antd";
import { Link } from "react-router-dom";
import { ReviewCard } from "../ui";
import { WhatWeServe, FeaturedProduct } from "../components";

const Home = () => {
    return (
        <div className="min-h-screen bg-pure-900">
            <section className="min-h-screen">
                <div className="container mx-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="w-1/2 flex justify-center flex-col">
                            <div className="text-5xl font-bold tracking-wider text-gray">
                                <h1>
                                    Your Favourite{" "}
                                    <em className="text-active">food</em>
                                </h1>
                                <h1>
                                    <em className="text-active">delivery </em>
                                    Partner Fudo
                                </h1>
                            </div>
                            <p className="text-gray mt-1 italic font-light tracking-widest">
                                We are focused on being the best helping hand to
                                local bussinesses
                            </p>

                            <Link to="/menu" className="mt-12">
                                <Button type="default" size="large">
                                    Order Now
                                </Button>
                            </Link>

                            <div className="mt-8 flex items-center">
                                <ReviewCard />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <img
                                src="/eating_together.svg"
                                alt="eating_together"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="min-h-screen">
                <div className="container mx-auto py-16 ">
                    <WhatWeServe />
                </div>
            </section>

            <section className="mt-8">
                <FeaturedProduct />
            </section>
        </div>
    );
};

export default Home;
