import { Link } from "react-router";
import { useState } from "react";
import { tv } from "tailwind-variants";


export default function Gamepage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const animalCards = tv ({
        base: "text-3xl border  rounded-[15px] w-[470px] h-[250px] overflow-hidden  hover:opacity-90 hover:cursor-pointer",
        variants: {
            selected :{
                true: "bg-green-200 border-6 border-orange-500 scale-105",
                false: "",
            },
        },
        defaultVariants: {
    selected: false,
    },
    });

    const animals = [
    {id:"leopard", name:"Леопард" , image: "images/leopard.png"},
    {id:"tiger", name:"Тигр" , image: "images/tiger.png"},
    {id:"elephant", name:"Слон" , image: "images/elephant.png"},
    {id:"rabbit", name:"Кролик" , image: "images/rabbit.png"},
    ];



    return (
    <main className="bg-white p-6">
        <Link to = "/" className="absolute inline-block bg-orange-500 text-xl  p-2 text-white rounded-[15px] top-[70px] right-[320px] active:scale-95 active:bg-orange-700">
            <p>Завершити</p>
        </Link>
        <section className ="grid  grid-cols-2  gap-8 ">
            {animals.map((animal) => (
            <button key= {animal.id} onClick={() => setSelectedId(animal.id)} className ={animalCards({selected: selectedId === animal.id})} type="button" >
                <img src={animal.image} alt="secretName" className=" w-full h-full object-cover"/>
            </button>))}
        </section>
    </main>
    );
}