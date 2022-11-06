import { Get, Query, Route, Tags } from 'tsoa';
import { LogSuccess } from "../utils/loggers";
import { IHelloController } from "./interfaces";
import { BasicResponse } from "./types";

@Route('/api/hello')
@Tags("helloController")
export class HelloController implements IHelloController {
    /**
     * Endpoint que devuelve un mensaje Hello {name} en json
     * @param { string | undefined } name nombre dado desde query
     * @returns { BasicResponse } Promise de BasicResponse
     */
    @Get("/")
    public async getMessage(@Query()name?: string | undefined): Promise<BasicResponse> {
        LogSuccess('[/api/hello] Get Request');

        return {
            message: `Hello ${name || 'guess!'}`
        }
    } 
}