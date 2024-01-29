import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to={"/"} className="flex items-center justify-center">
            <span className="flex items-center justify-center bg-active rounded-full w-[16px] h-[16px] mr-2">
                <span className="bg-pure rounded-[50%] w-[40%] h-[40%] inline-block"></span>
            </span>
            <div className="text-xl font-bold tracking-wide leading-3 text-pure">
                <span>F</span>
                <span className="text-active">UD</span>
                <span>O</span>
            </div>
        </Link>
    );
};

export default Logo;
