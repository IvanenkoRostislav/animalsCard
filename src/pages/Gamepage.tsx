import { Link, useLocation} from "react-router";
import { useState } from "react";
import { tv } from "tailwind-variants";
import AnimalPoup from "../components/common/AnimalPopup";
import { animals } from "../data/animal";

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
}


export default function Gamepage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState <Animal | null>(null);
    const [marksG, setMarksG] = useState(0);
    const location = useLocation();
    const gameName = location.state?.gameName || "USER1234";
    const [startIndex, setStartIndex] = useState(0);
    const [usedCards, setUsedCards] = useState<string[]>([]);
    const firstMark : number = 25;
    
    const animalsBoard = animals.filter(animal => !usedCards.includes(animal.id) ).slice(startIndex, startIndex + 4);

    
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

    function hadleCorrectAnswer(): void {
        setMarksG(prevMarks=> prevMarks + firstMark);
    }
    function anulation(): void {
        if (animalsBoard.length <= 0){
            alert("ВСе масив закінчився")
        }
        else{setMarksG(prevMarks => prevMarks - 50)}
        
    }
    function handleSkipCard(): void{
        setStartIndex(prev => prev + 1);
        anulation();
    }
    function hadleRemoveCard(): void{
        if (selectedId === null) return;
        setUsedCards(prev => [...prev, selectedId]);
        setSelectedId(null);
        setSelectedAnimal(null);
        setIsOpen(false);
    } 


    return (
    <main className="bg-white flex-1 flex gap-4 ">
        <aside className="flex flex-col gap-3 justify-center w-[15%] border border-gray-500 p-4">
            <h2 className="text-4xl">{gameName}</h2>
            <p className="text-blue-500 text-2xl">{marksG}балів</p>
            <button className="inline-block bg-orange-500 text-xl  p-2 text-white rounded-[15px] active:scale-95 active:bg-orange-700" onClick={handleSkipCard}>Пропустити хід</button>
        </aside>    
        <Link to = "/gameover" className="absolute inline-block bg-orange-500 text-xl  p-2 text-white rounded-[15px] top-[70px] right-[320px] active:scale-95 active:bg-orange-700" state={{ gameName, marksG }}>
            <p>Завершити</p>
        </Link>
        <section className ="pt-15 grid  grid-cols-[repeat(2,470px)] gap-8 justify-center items-center cotent-start w-[70%] ">
            {isOpen &&  selectedAnimal && 
            <AnimalPoup 
            animal={selectedAnimal} 
            onClose={() => {
                setIsOpen(false);
                hadleRemoveCard();
            }}
            correctAnswer = {hadleCorrectAnswer}
            marks = {firstMark}
            nextCard = {hadleRemoveCard}
            />}
            {animalsBoard.map((animal) => (
            <button key= {animal.id}  
            onClick={() => {
                setSelectedId(animal.id); 
                setIsOpen(true);
                setSelectedAnimal(animal);
            }} 
                className ={chosenCard({selected: selectedId === animal.id})} type="button" >
                <img src={animal.image} alt="secretName" className=" w-full h-full object-cover"/>
            </button>))}
        </section>
        <aside className=" w-[15%] border border-gray-500">
            <p>Enemy</p>
        </aside>
    </main>
    );
}