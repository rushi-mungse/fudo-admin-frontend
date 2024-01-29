import { Link } from "react-router-dom";

interface PropType {
    to: string;
    text: string;
}

const LinkText = ({ to, text }: PropType) => {
    return (
        <Link
            to={to}
            className="text-pure inline-block text-sm hover:text-neutral-400 transition-all"
        >
            {text}
        </Link>
    );
};

export default LinkText;
