import React, { ReactNode } from "react";

interface PropType {
    title: string;
    description: string | ReactNode;
}

type ContentType = PropType & React.HTMLAttributes<HTMLElement>;

const Content = ({ title, description, ...props }: ContentType) => {
    return (
        <div {...props}>
            <p className="text-3xl font-bold text-active text-center">
                {title}
            </p>
            <div className="text-gray italic text-center tracking-widest text-sm">
                {description}
            </div>
        </div>
    );
};

export default Content;
