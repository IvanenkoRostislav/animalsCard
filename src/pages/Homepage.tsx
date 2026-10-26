import {Link} from "react-router";

export default function Homepage() {
    return (
        <>
            <section className="flex flex-col juctlify-center border p-5 gap-4 rounded-[15px]">
                <h3>Налаштування гри</h3>
                <Link to="/game" className="inline-block bg-orange-500 text-4xl font-bold p-2 text-white rounded-[15px] active:scale-95 active:bg-orange-700">
                Почати гру
            </Link>
            </section>
            
        </>
    );

}