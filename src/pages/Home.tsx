import { Button } from "antd";
import { Link } from "react-router-dom";
import { ReviewCard } from "../ui";
import { WhatWeServe, FeaturedProduct } from "../components";

const Home = () => {
    // <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
    // <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
    // <div clashhs="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>;
    // <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    // [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#05af74_100%)]
    return (
        <div className="min-h-screen">
            <section className="min-h-screen bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#05af74_100%)]">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
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

            <section className="min-h-screen bg-activeLight/40 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]">
                <div className="container mx-auto py-16 ">
                    <WhatWeServe />
                </div>
            </section>

            <section className="pt-8 bg-activeLight/40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                <FeaturedProduct />
            </section>
        </div>
    );
};

export default Home;
