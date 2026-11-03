import { Link, useLocation} from "react-router";



export default function Gamepage() {
    const location = useLocation();
    const gameName = location.state?.gameName || "USER1234";
    const marksG = location.state?.marksG || 0;
    return(
        <div className = "flex flex-col justify-center items-center gap-4 ">
            <Link to = "/"  >На головну </Link>
            <form className="mt-20 flex flex-col border border-orange-400 p-4 rounded-[15px] gap-4 w-[30%]">
                <h2 className="text-4xl text-orange-500">Результати гри</h2>
                <p className="text-2xl"> Вітаємо! {gameName}</p>
                <p className="text-2xl"> Ви набрали {marksG} балів!</p>

            </form>
        </div>
        
    )
}