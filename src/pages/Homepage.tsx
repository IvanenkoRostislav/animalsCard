import {Link} from "react-router";
import { useState } from "react";


export default function Homepage() {

    const[userGame,setUserGame] = useState("");

    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-4">
            <section className="flex flex-col juctlify-center border p-5 gap-4 rounded-[15px] w-[30%]">
                <h3>Налаштування гри</h3>
                <input  className="w-full h-[40px] p-1  border border-black rounded-[15px]" type="text" placeholder="Введи свій нікнейм" onChange={(e) => setUserGame(e.target.value)} value={userGame}/>
                <Link 
                to="/game" 
                className="inline-block bg-orange-500 text-4xl font-bold p-2 text-white rounded-[15px] active:scale-95 active:bg-orange-700 text-center"
                state={{userGame}}>
                Почати гру
                </Link>
            </section>
        </div>
    );

}