export function botAnswer(chance: number): boolean {
    return Math.random() < chance;
}

export function botTurn(level: string): number {
    let marks = 0;

    if(level === "easy") {

        if (botAnswer(0.6)){
            marks +=15
            if (botAnswer(0.5))
            {marks +=35}
        }

        
    }

    if(level === "medium") {

        if (botAnswer(0.8)){
            marks +=15
            if (botAnswer(0.7)){
                marks +=35
            }
        }        
    }

    if(level === "hard") {

        if (botAnswer(0.95)){
        marks +=15
        if (botAnswer(0.9))
            {marks +=35}
        }
    }

    return marks;
}