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
        correctAnswer: string;
    };
    correctAnswer_ONE: () => void;
    correctAnswer_TWO: () => void;
    marks : number;
    secondMark?: number;
}

export default function AnimalPoup({onClose, animal, correctAnswer_ONE: correctAnswer_ONE, correctAnswer_TWO,  marks, secondMark}:AnimalPoupProps){
    const [answer, setAnswer] = useState("");
    const [answerTrue,setAnswerTrue] = useState<boolean | null> (null);
    const [answerTrue_TWO,setAnswerTrue_TWO] = useState<boolean | null> (null);
    const [isClick, setIsClick] = useState(false);
    const [isClick2, setIsClick2] = useState(false);
    const [answerSecond, setAnswerSecond] = useState("");
    
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
            correctAnswer_ONE()
        }
    }
    function handleCheckAnswerTwo() {
        const isCorrect = answerSecond === animal.correctAnswer;
        setAnswerTrue_TWO(isCorrect);
        if (isCorrect) {
            correctAnswer_TWO()
        }
    }
    function handleCheckClick_ONE(){
        if (isClick) return;
        handleCheckAnswer();
        setIsClick(true);
    }
    function handleCheckClick_TWO(){
        if (isClick2) return;
        handleCheckAnswerTwo();
        setIsClick2(true);
    }
    
    

    return(
        <div className=" fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <section className="relative bg-white border border-black p-4 pt-14 rounded-[15px] flex flex-col gap-3 w-[500px] ">
                <button  onClick={onClose} className="absolute top-4 right-4 active:scale-90 hover:cursor-pointer">
                <FaWindowClose size={30} color="red"/>
                </button>                     
                <img src={animal.image} alt="secretName" className=" w-100 h-50 object-cover"/>
                <p className="p-1">Введи назву тварину</p>
                <input type="text" placeholder="Введи назву тварину" className="border border-gray-300 rounded-md p-2 w-full"  onChange={(e) => setAnswer(e.target.value)} value={answer}/>
                <button 
                type="button" 
                onClick={handleCheckClick_ONE}
                disabled={isClick}
                className={btnanswer({disabled: isClick})}>Перевірити</button>
                {answerTrue &&(
                <>
                    <p className="text-green-500 bg-green-200 p-2 rounded-[15px]">Вірно! Вам нараховано {marks} балів</p>
                    <p>{animal.question}</p>
                    <form className="flex flex-col gap-3 text-1xl" >
                        <label>
                            <input 
                            type="radio" 
                            name="answerTwo" 
                            value="first" 
                            checked={answerSecond === "first"}
                            onChange={(e) => setAnswerSecond(e.target.value)}
                            />
                            {animal.variants.first}
                        </label>
                        <label>
                            <input 
                            type="radio"
                            name="answerTwo" 
                            value="second"
                            checked={answerSecond === "second"}
                            onChange={(e) => setAnswerSecond(e.target.value)}
                            />
                            {animal.variants.second}
                        </label>
                        <label>
                            <input 
                            type="radio"
                            name="answerTwo" 
                            value="third"
                            checked={answerSecond === "third"}
                            onChange={(e) => setAnswerSecond(e.target.value)}
                            />
                            {animal.variants.third}
                        </label>
                        {answerTrue_TWO &&(
                            <p className="text-green-500 bg-green-200 p-2 rounded-[15px]">Вірно! Вам нараховано {secondMark} балів</p>)}
                        {answerTrue_TWO ===false  &&(
                            <p className="text-red-500 bg-red-200 p-2 rounded-[15px]"> 
                            Ви не вгадали правильну відповідь.
                            </p>
                        )}
                        <button 
                            type="button" 
                            onClick={handleCheckClick_TWO}
                            disabled={isClick2}
                            className={btnanswer({disabled: isClick2})}>Перевірити
                        </button>
                    </form>
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

