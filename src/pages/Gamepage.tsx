import { Link } from "react-router";

export default function Gamepage() {

    const animals = ["leopard", "lion", "tiger", "cat" ];



    return (
    <main className="bg-white p-6">
        <Link to = "/" className="absolute inline-block bg-orange-500 text-xl font-bold p-2 text-white rounded-[15px] top-[70px] right-[320px]">
            <p>Завершити</p>
        </Link>
        <section className ="grid  grid-cols-2  gap-8 ">
            {animals.map((animal) => (
            <article key= {animal} className =" text-3xl border p-4 rounded-lg w-[470px] h-[250px]">
            {animal}
        </article>))}
        </section>
    </main>
    );

}