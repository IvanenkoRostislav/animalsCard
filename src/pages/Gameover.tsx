import { Link, useLocation} from "react-router";
import { tv } from "tailwind-variants";
import { IoIosArrowBack } from "react-icons/io";


export default function Gamepage() {
    const location = useLocation();
    const gameName = location.state?.gameName || "USER1234";
    const marksG = location.state?.marksG || 0;
    const botMark = location.state?.botMark ?? 0;

    const textResult = tv ({
        base: "text-4xl",
        variants: {
            victory :{
                true: "text-green-500 font-bold",
                false: "text-red-500 font-bold",
            },
        },
        defaultVariants: {
        victory: false,
    },
    });
    const bgResult = tv ({
        base: "flex flex-col justify-center items-center gap-4 bg-white h-screen",
        variants: {
            victory :{
                true: "bg-green-200",
                false: "bg-red-200",
            },
        },
        defaultVariants: {
        victory: false,
    },
    });

    const result = marksG > botMark? "Ти переміг!" : marksG < botMark ? "Переміг бот": "Нічия!";
    return(
        <div className = {bgResult({victory : marksG > botMark})}>
            <Link to = "/" className="text-orange-500 text-2xl flex flex-row items-center"><IoIosArrowBack /> На головну </Link>
            <form className="flex flex-col border border-orange-400 p-4 rounded-[15px] gap-4 w-[30%] bg-white">
                <h2 className="text-4xl text-orange-500 self-center">Результати гри</h2>
                <p className={textResult({victory : marksG > botMark})}> {result}</p>
                {marksG > botMark && <p className="text-2xl"> Вітаємо! {gameName}</p>}
                <p className="text-2xl">{gameName} набрали {marksG} балів!</p>
                <p className="text-2xl">Бот набрав {botMark} балів !</p>
            </form>
        </div>
        
    )
}