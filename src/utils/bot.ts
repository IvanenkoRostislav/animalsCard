export function botAnswer(chance: number): boolean {
    return Math.random() < chance;
}

export function botTurn(): number {
    if(!botAnswer(0.9)) return 0;

    let marks = 15;

    if (botAnswer(0.9)){
        marks +=15
    }
    if (botAnswer(0.8)){
        marks +=35
    }

    return marks;
}