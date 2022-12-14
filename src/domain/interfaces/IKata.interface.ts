import { IUser } from './IUser.interface';
export enum KataLevel {
    BASIC = 'Basic',   //0
    MEDIUM = 'Medium', //1
    HIGH = 'High'      //2
}

export interface IKata {
    name: string,
    description: string,
    level: KataLevel,
    intents: number,
    stars: number,
    creator: any, // Id of user
    participants: string[],
    solution: string,
}
