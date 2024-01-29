import { NavLink } from "react-router-dom";
import { LinkType } from "../types";

interface PropType {
    links: LinkType[];
}

export type PageLinksType = PropType & React.HTMLAttributes<HTMLElement>;

const PageLinks = ({ links }: PageLinksType) => {
    return (
        <div className="flex items-center justify-center gap-12">
            {links.map((link) => (
                <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                        `${
                            isActive ? "text-active" : "text-gray"
                        } text-sm trnasition-all hover:text-neutral-600`
                    }
                    key={link.text}
                >
                    <span className="text-md">{link.text}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default PageLinks;
