import Serve from "../ui/Serve";

const WhatWeServe = () => {
    return (
        <div className="flex-center flex-col">
            <div className="flex items-center flex-col gap-4">
                <span className="text-active tracking-wide font-medium text-lg inline-block">
                    WHAT WE SERVE
                </span>
                <h1 className="text-5xl font-light w-[70%] text-center leading-snug tracking-wider">
                    Be The Fastest In Delivering Your Food
                </h1>
            </div>
            <div className="py-16 grid grid-cols-3 w-full">
                <Serve
                    imgUrl="/easy_order.svg"
                    heading="Easy To Order"
                    description="You only need a few steps in ordering food."
                />

                <Serve
                    imgUrl="/delivery.svg"
                    heading="Fastest Delivery"
                    description="Delivery that is always ontime even faster."
                />

                <Serve
                    imgUrl="/quality.svg"
                    heading="Best Quality"
                    description="Not only fast for us quality is also number one."
                />
            </div>
        </div>
    );
};

export default WhatWeServe;
