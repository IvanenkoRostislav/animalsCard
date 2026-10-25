import { Link } from "react-router"


export default function Header(){
    return (
        <header className="h-[60px] border border-black">
            <Link to="/">
                <h1 className="text-2xl font-bold p-2 color-orange">
                    Animals Card
                </h1>
            </Link>
            
        </header>
    )
}