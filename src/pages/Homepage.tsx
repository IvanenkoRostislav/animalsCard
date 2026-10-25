import {Link} from "react-router";

export default function Homepage() {
    return (
        <>
            <Link to="/game" className="inline-block bg-orange-500 text-4xl font-bold p-2 text-white rounded-[15px]">
                Почати гру
            </Link>
        </>
    );

}