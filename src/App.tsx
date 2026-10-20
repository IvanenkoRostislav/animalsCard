import './App.css'

function App() {

  const animals = [ "leopard", "lion", "tiger", "cat" ];

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-4xl font-bold p-2">
        Animals Card
      </h1>
      <section className ="grid  grid-cols-2  gap-6 ">
        {animals.map((animal) => (
          <article key= {animal} className =" text-3xl border p-4 rounded-lg">
          {animal}
        </article>
        ))}
      </section>
      <p className="mt-4 text-slate-400">
        myprojects
      </p>
    </main>
  );
}

export default App;