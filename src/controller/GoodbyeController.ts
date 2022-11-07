import { DateResponse } from './types/index';
import { LogSuccess } from '../utils/loggers';

import { IGoodbyeController } from './interfaces/index';
import { Get, Query, Route, Tags } from 'tsoa';

const date = new Date()
const actual = date.getDate() +'-'+ (date.getMonth()+1) +'-'+ date.getFullYear()

@Route('/api/goodbye')
@Tags("GoodbyeController")
export class GoodbyeController implements IGoodbyeController{

    @Get("/")
    public async getMessage(@Query()name?: string): Promise<DateResponse> {
        LogSuccess('[/api/goodbye] Get Request');
        return {
            message:`Goodbye ${name || 'guess!'}`,
            Date: actual
        }
    }
}