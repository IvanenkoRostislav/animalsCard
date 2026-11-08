import { Link, useLocation, useNavigate} from "react-router";
import { useState, useEffect } from "react";
import { tv } from "tailwind-variants";
import AnimalPoup from "../components/common/AnimalPopup";
import { animals } from "../data/animal";
import { botTurn } from "../utils/bot";
import { createAnimalMap } from "../data/funcanimals";

import { LuBot } from "react-icons/lu";
import { RiUser3Fill } from "react-icons/ri";

type Animal = {
    id: string;
    name: string;
    image: string;
    question:string;
    variants: {
        first: string;
        second: string;
        third: string;
    };
    correctAnswer: string;
}


export default function Gamepage() {
    const [animalMap] = useState(() => createAnimalMap(animals));
    const [playerCards, setPlayerCards] = useState(animalMap.animalsPlayer);
    const [botCards, setBotCards] = useState(animalMap.animalsBot);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState <Animal | null>(null);
    const [marksG, setMarksG] = useState(0);
    const location = useLocation();
    const gameName = location.state?.gameName || "USER1234";
    const levelGame = location.state?.levelGame || "easy";
    const [botMark, setBotMark] = useState(0);
    const [current, setCurrent] = useState<"player" | "bot"> ("player");

    const firstMark : number = 15;
    const secondMark : number = 35;
    const navigate = useNavigate();
    
    const activeCards = current=== "player" ? playerCards : botCards;
    const animalsBoard = activeCards.slice(0, 4);


    const chosenCard = tv ({
        base: "text-3xl border  rounded-[15px] w-[470px] h-[250px] overflow-hidden  hover:opacity-90 hover:cursor-pointer",
        variants: {
            selected :{
                true: "border-7 border-orange-400 scale-105",
                false: "",
            },
        },
        defaultVariants: {
    selected: false,
    },});

    const GameField = tv ({
        base: "p-6 grid  grid-cols-[repeat(2,470px)] gap-8 justify-center items-center cotent-start ",
        variants: {
            player :{
                true: "bg-green-100",
                false: "bg-red-200",
            },
        },
        defaultVariants: {
        player: true,
    },
    });

    //USEEFECT
    useEffect(() => {
    const playerFinished = playerCards.length === 0;
    const botFinished = botCards.length === 0;

    if (playerFinished && botFinished) {
        navigate("/gameover", {
            state: { gameName, marksG, botMark },
        });
        return;
    }

    if (current === "player" && playerFinished) {
        setCurrent("bot");
    } else if (current === "bot" && botFinished) {
        setCurrent("player");
        }
    }, [
        current,
        playerCards.length,
        botCards.length,
        navigate,
        gameName,
        marksG,
        botMark,
    ]);

    useEffect(() => {
        if (current !== "bot" || botCards.length ===0) return;
        const timer = setTimeout(()=>{
            const marks = botTurn(levelGame);
            setBotMark(prev => prev + marks);
            setBotCards(prev => prev.slice(1));
            setCurrent("player");
        }, 4000);
        return () => clearTimeout(timer);
    },[current, botCards.length, levelGame]);
    
   
    //FUNCTIONS
    function hadleCorrectAnswer_ONE(): void {
        setMarksG(prevMarks=> prevMarks + firstMark);
    }
    function hadleCorrectAnswer_TWO(): void {
        setMarksG(prevMarks=> prevMarks + secondMark);
    }
    function handleSkipCard(): void{
        if (current !=="player" || isOpen || playerCards.length === 0) return;
        setPlayerCards(prev => prev.slice(1));
        setMarksG(prevMarks => prevMarks - 20);
        setCurrent("bot");
        
    }
    function hadleRemoveCard(): void{
        if(current !== "player" || selectedId === null) return;
        setPlayerCards(prev => prev.filter(animal => animal.id !== selectedId));
        setSelectedId(null);
        setSelectedAnimal(null);
        setIsOpen(false);
        setCurrent("bot");
    }
    return (
    <main className="bg-white flex-1 flex gap-4 ">
        <aside className="flex flex-col gap-4 justify-start w-[15%] border border-gray-500 p-4 items-center">
            <RiUser3Fill size={40} />
            <h2 className="text-1xl max-w-[90%] wrap-anywhere">{gameName}</h2>
            <p className="text-3xl text-blue-600">{marksG}балів</p>
            <button className="inline-block bg-orange-500 text-xl  p-2 text-white rounded-[15px] active:scale-95 active:bg-orange-700" onClick={handleSkipCard} 
            disabled={current !== "player" || isOpen || playerCards.length === 0}>
            Пропустити хід</button>
            <button
                type="button"
                disabled={isOpen}
                onClick={() => setCurrent("player")}>
                Показати картки гравця
            </button>

            <button
                type="button"
                disabled={isOpen}
                onClick={() => setCurrent("bot")}>
                Показати картки бота
            </button>
            
        </aside>    
        <Link to = "/gameover" className="absolute inline-block bg-orange-500 text-xl  p-2 text-white rounded-[15px] top-[70px] right-[320px] active:scale-95 active:bg-orange-700" state={{ gameName, marksG }}>
            <p>Завершити</p>
        </Link>
        <section className="flex flex-col w-[70%] gap-2">
            <section className="flex flex-row items-center gap-100 justify-start  p-4">
                {current === "player" ? 
                (<p className="text-green-500 text-4xl font-bold">Твій хід</p>) : 
                (<p className="text-red-500 text-4xl font-bold">Хід бота</p>)}
                <p> 00:17:00</p>
            </section>
            <section className = {GameField({player: current === "player"})}>
                {isOpen &&  selectedAnimal && 
                <AnimalPoup 
                animal={selectedAnimal} 
                onClose={hadleRemoveCard} 
                correctAnswer_ONE = {hadleCorrectAnswer_ONE}
                correctAnswer_TWO = {hadleCorrectAnswer_TWO}
                marks = {firstMark}
                secondMark = {secondMark}
                />}
                {animalsBoard.map((animal) => (
                <button key= {animal.id}  
                onClick={() => {
                    setSelectedId(animal.id); 
                    setIsOpen(true);
                    setSelectedAnimal(animal);
                    
                }}
                disabled={current !== "player"} 
                    className ={chosenCard({selected: selectedId === animal.id})} type="button" >
                    <img src={animal.image} alt="secretName" className=" w-full h-full object-cover"/>
                </button>))}
            </section>
            
        </section>
        <aside className=" w-[15%] border border-gray-500 flex flex-col items-center gap-4 p-4 ">
            <h2 className="text-1xl"><LuBot color ="red" size={40}/> Бот</h2>
            <p className="text-3xl text-blue-600">{botMark} балів</p>
        </aside>
    </main>
    );
}
