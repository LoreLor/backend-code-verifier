import { DateResponse } from './types/index';
import { LogSuccess } from '../utils/loggers';

import { IGoodbyeController } from './interfaces/index';

const date = new Date()
const actual = date.getDate() +'-'+ (date.getMonth()+1) +'-'+ date.getFullYear()


export class GoodbyeController implements IGoodbyeController{
    public async getMessage(name?: string | undefined): Promise<DateResponse> {
        LogSuccess('[/api/goodbye] Get Request');
        return {
            message:`Goodbye ${name || 'guess!'}`,
            Date: actual
        }
    }
}