import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import { tv } from "tailwind-variants";



type AnimalPoupProps = {
    onClose: () =>void;
    animal: {
        id: string;
        name: string;
        image: string;
        question: string;
        variants: {
            first: string;
            second: string;
            third: string;
        };
    };
    correctAnswer: () => void;
    marks : number;
    nextCard: () => void;
}

export default function AnimalPoup({onClose, animal, correctAnswer, marks, nextCard}:AnimalPoupProps){
    const [answer, setAnswer] = useState("");
    const [answerTrue,setAnswerTrue] = useState<boolean | null> (null);
    const [isClick, setIsClick] = useState(false);
    
    const btnanswer = tv ({
        base: " p-2 text-white rounded-[15px] ",
        variants: {
            disabled :{
                true: "bg-gray-400 cursor-not-allowed",
                false: "bg-orange-500 active:scale-95  hover:cursor-pointer",
            },
        },
        defaultVariants: {
    disabled: false,
    },
    });



    //FUNCTION
    function handleCheckAnswer() {
        const isCorrect = answer.trim().toLowerCase() === animal.name.toLowerCase()
        
        setAnswerTrue(isCorrect);
        if (isCorrect) {
            correctAnswer();
        }
    }
    function handleCheckClick(){
        if (isClick) return;
        handleCheckAnswer();
        setIsClick(true);
        
    }
    
    

    return(
        <div className=" fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <section className="relative bg-white border border-black p-4 pt-14 rounded-[15px] flex flex-col gap-3 w-[500px] ">
                <button  onClick={() =>{onClose(); nextCard()}
                    } className="absolute top-4 right-4 active:scale-90 hover:cursor-pointer">
                <FaWindowClose size={30} color="red"/>
                </button>
                <img src={animal.image} alt="secretName" className=" w-100 h-50 object-cover"/>
                <p className="p-1">Введи назву тварину</p>
                <input type="text" placeholder="Введи назву тварину" className="border border-gray-300 rounded-md p-2 w-full"  onChange={(e) => setAnswer(e.target.value)} value={answer}/>
                <button 
                type="button" 
                onClick={handleCheckClick}
                disabled={isClick}
                className={btnanswer({disabled: isClick})}>Перевірити</button>
                {answerTrue &&(
                <>
                    <p className="text-green-500 bg-green-200 p-2 rounded-[15px]">Вірно! Вам нараховано {marks} балів</p>
                    <p>{animal.question}</p>
                    <section className="flex flex-col gap-2">
                        <label>
                            <input type="radio"/>
                            {animal.variants.first}
                        </label>
                        <label>
                            <input type="radio"/>
                            {animal.variants.second}
                        </label>
                        <label>
                            <input type="radio"/>
                            {animal.variants.third}
                        </label>                       
                    </section>
                </>)}
                {answerTrue === false &&(
                    <p className="text-red-500 bg-red-200 p-2 rounded-[15px]"> 
                    Ви не вгадали тварину
                    </p>
                )}
        </section>
        </div>
        
    )
}
