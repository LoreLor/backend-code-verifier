import { LogSuccess } from "@/utils/loggers";
import { IHelloController } from "./interfaces";
import { BasicResponse } from "./types";

export class HelloController implements IHelloController {
    public async getMessage(name?: string | undefined): Promise<BasicResponse> {
        LogSuccess('[/api/hello] Get Request');
        return {
            message: `Hello ${name || 'guess!'}`
        }
    }
    
}