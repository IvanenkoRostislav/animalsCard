import { Link, useLocation, useNavigate} from "react-router";
import { useState, useEffect } from "react";
import { tv } from "tailwind-variants";
import AnimalPoup from "../components/common/AnimalPopup";
import { animals } from "../data/animal";
import { botTurn } from "../utils/bot";
import { createAnimalMap } from "../data/funcanimals";

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
    const [botMark, setBotMark] = useState(0);
    const [current, setCurrent] = useState<"player" | "bot"> ("player");

    const firstMark : number = 15;
    const secondMark : number = 35;
    const navigate = useNavigate();
    
    const activeCards = current=== "player" ? playerCards : botCards;
    const animalsBoard = activeCards.slice(0, 4);

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
            const marks = botTurn();
            setBotMark(prev => prev + marks);
            setBotCards(prev => prev.slice(1));
            setCurrent("player");
        }, 4000);
        return () => clearTimeout(timer);
    },[current, botCards.length]);
    
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
    },
    });
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
        <aside className="flex flex-col gap-3 justify-center w-[15%] border border-gray-500 p-4">
            <h2 className="text-4xl">{gameName}</h2>
            <p className="text-blue-500 text-2xl">{marksG}балів</p>
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
            {current === "player" ? (
                <p className="text-green-500 text-3xl">Твій хід</p>
            ) : (
                <p className="text-red-500 text-3xl">Хід бота</p>
            )}
        </aside>    
        <Link to = "/gameover" className="absolute inline-block bg-orange-500 text-xl  p-2 text-white rounded-[15px] top-[70px] right-[320px] active:scale-95 active:bg-orange-700" state={{ gameName, marksG }}>
            <p>Завершити</p>
        </Link>
        <section className ="pt-15 grid  grid-cols-[repeat(2,470px)] gap-8 justify-center items-center cotent-start w-[70%] ">
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
        <aside className=" w-[15%] border border-gray-500">
           <p>Бот: {botMark} балів</p>
            <p>{current === "bot" ? "Бот думає…" : "Твій хід"}</p>
        </aside>
    </main>
    );
}
