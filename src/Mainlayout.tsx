import { Outlet } from "react-router";
import Header from "./layout/Header";

export default function Mainlayout(){
    return(
        <section className="flex min-h-screen flex-col">
            <Header/>
        <main className="flex flex-col flex-1  items-center justify-center">
            <Outlet/>
        </main>
        </section>
    );
}