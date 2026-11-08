import { useNavigate } from "react-router";
import { useState } from "react";
import { IoSettings } from "react-icons/io5";



export default function Homepage() {

    const[gameName,setGameName] = useState("");
    const[levelGame,setLevelGame] = useState("easy");
    const navigate = useNavigate();
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        navigate("/game", { state: { gameName,levelGame } });
    }

    return (
        <form className="flex flex-col flex-1 justify-center items-center gap-4" onSubmit={handleSubmit}>
            <section className="flex flex-col juctlify-center border p-5 gap-4 rounded-[15px] w-[30%]">
                <div className="flex flex-row justify-center items-center gap-4">
                    <IoSettings size={40} color="#f8571c"/>
                    <h2 className="text-orange text-3xl">Налаштування гри</h2>
                </div>
                <input  
                className="w-full h-[40px] p-1  border border-black rounded-[15px]" 
                type="text" 
                placeholder="Введи свій нікнейм" 
                maxLength={25}
                onChange={(e) => setGameName(e.target.value)} value={gameName}
                />
                <div className="flex flex-row items-center gap-4">
                    <p>Рівень складності бота</p>
                    <select onChange={(e) => setLevelGame(e.target.value)} value={levelGame} className="border border-black rounded-[15px] p-1">
                        <option value="easy">Легкий</option>
                        <option value="medium">Середній</option>
                        <option value="hard">Важкий</option>
                    </select>
                </div>
                
                <button
                type="submit"
                className="inline-block bg-orange-500 text-4xl font-bold p-2 text-white rounded-[15px] active:scale-95 active:bg-orange-700 text-center"
                >
                Почати гру
                </button>
            </section>
        </form>
    );

}
