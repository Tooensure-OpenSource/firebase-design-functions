// import { ServiceResponse } from '../Helpers/Common/serviceReponse';
import { IControllerBase } from './IControllers/i-controller.base';
import * as functions from "firebase-functions";
// import { Firestore } from  "firestore-implementation/firestore";

import { HttpMethodType } from './http-method.type';
// import { IUnitOfWorkBase } from '../UnitOfWork/IUnitOfWork/i-unit-of-work.base'
// import { UnitOfWorkBase } from '../UnitOfWork/unit-of-work.base'
import { ControllerLogicBase } from "./controller.logic.base";
import { Firestore } from "../Firestore/firestore";

// import { ModelBase } from '../Models/model.base';

export abstract class ControllerBase<Request, Response> extends ControllerLogicBase implements IControllerBase<Request, Response>
{
    Use = () => this.InitFunction();

    // private _unitOfWorkBase : IUnitOfWorkBase<Request>;
    private responseData: Response[] | null = null;

    protected firestore = new Firestore<Request>();
    constructor(protected _defaultCollection : string) {
        super();

        this.firestore.SetCollection([
            _defaultCollection
        ])
        
    }
    // async Execute(method : string, uid : string | undefined = undefined, model : T  | undefined): Promise<void> {
    //     // HTTP POST object
    //     if (method == HttpMethodType.POST.toString().toUpperCase() && typeof model !== 'undefined' && model)
    //         this._serviceResponse = await this.Add(model);

    //     // HTTP GET object
    //     if (method == HttpMethodType.GET.toString().toUpperCase() && typeof uid == 'undefined') 
    //         this._serviceResponse = await this.GetAll();

    //     // HTTP GET objects
    //     if (method == HttpMethodType.GET.toString().toUpperCase() && typeof uid !== 'undefined') 
    //         this._serviceResponse = await this.Get(uid);
    // }

    
    abstract Init(): any;
    abstract Get(model : Request) : Promise<Response>;
    abstract GetAll(): Promise<Response>;
    abstract Add(model : Request): Promise<Response>;
    abstract Delete(model : Request): Promise<Response>;
    abstract Upsert(model: Request): Promise<Response>;
    ClearResponse()
    {
        this.responseData = null;
    }

    public InitFunction() : any
    {
        return functions.https.onRequest(async (request, response) => {
            const data = request.body as Request[] | undefined;
            this.ClearResponse();

            var POST = request.method == HttpMethodType.POST.toString().toUpperCase();
            var GET = request.method == HttpMethodType.GET.toString().toUpperCase();

            // HTTP POST object
            if (POST && typeof data !== 'undefined' && data) 
            {
                // var ids = data as unknown as ModelBase[];
                console.log("Post Request")
                for (let i = 0; i < data.length; i++) {
                    const model = data[i];
                    this.responseData == null ? 
                        new Array(await this.Add(model) as Response) : this.responseData.push(await this.Add(model) as Response);
                }
                // var responseData: Response = await this.Add(data) as Response;

                response.send(JSON.parse(JSON.stringify(this.responseData)));

                // response.send(JSON.parse(JSON.stringify(await this.Add(data))));,
            }

            // HTTP GET objects
            if (GET && typeof data == 'undefined' || GET && data && data.length <= 0)
            {
                this.responseData = await this.GetAll() as unknown as Response[];
                // var responseData = await this._unitOfWorkBase.GenericUnitOfWork.GetAll();
                // response.send(JSON.parse(JSON.stringify(responseData)));

                // response.send(JSON.parse(JSON.stringify(await this.GetAll())));
            }

            // HTTP GET object
            if (GET && typeof data !== 'undefined' || GET && data && data.length >= 1) 
            {
                for (let i = 0; i < data.length; i++) {
                    const model = data[i];
                    this.responseData == null ? 
                        new Array(await this.Get(model) as Response) : this.responseData.push(await this.Get(model) as Response);
                }
                // var ids = data as unknown as ModelBase[];

                // var responseData = await this._unitOfWorkBase.GenericUnitOfWork.Get(ids);
                // response.send(JSON.parse(JSON.stringify(responseData)));
                // response.send(JSON.parse(JSON.stringify(await this.Get(data))));
            }

        });
    }
}