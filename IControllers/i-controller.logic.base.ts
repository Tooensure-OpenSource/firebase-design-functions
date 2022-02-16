import { HttpMethodType } from '../../Helpers/http-method.type';

export interface IControllerLogicBase
{
    CanExecute(canExecute : boolean[]) : boolean;
    DisableAutoOpperation(HttpMethodType : HttpMethodType[]) : void;
    ExecuteFirst(HttpMethodType : HttpMethodType[]) : void;

}