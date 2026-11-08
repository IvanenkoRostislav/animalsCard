import { animals as animalData } from "./animal";
type Animal = (typeof animalData)[number];

export function createAnimalMap(animals: Animal[]) {
    const shuffled = [... animals];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i] , shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    const midle = Math.floor(shuffled.length / 2);
    const animalsBot = shuffled.slice(0, midle);
    const animalsPlayer = shuffled.slice(midle);
    return { animalsBot, animalsPlayer };
}