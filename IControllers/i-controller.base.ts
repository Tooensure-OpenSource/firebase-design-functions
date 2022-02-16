
import { IControllerLogicBase } from "./i-controller.logic.base";

export interface IControllerBase<Request, Response> extends IControllerLogicBase
{
    Init() : any;
    // Execute(method : string, uid : string, model : T) : Promise<void>
    Get(model : Request) : Promise<Response>;
    GetAll() : Promise<Response>;
    Add(model : Request) : Promise<Response>;
    Delete(model : Request) : Promise<Response>;
    Upsert(model : Request) : Promise<Response>;

}