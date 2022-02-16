import { HttpMethodType } from "../Helpers/http-method.type";

export abstract class ControllerLogicBase
{

    protected executeMethodsFirst: HttpMethodType[] = Array(HttpMethodType.None);
    protected autoOpperate: HttpMethodType[] = Array(HttpMethodType.None);;
    

    CanExecute(canExecute: boolean[]): boolean {
        var valid = true;
        canExecute.forEach(validate => {
            if(validate == false)
            {
                valid = false;
            }
        });
        return valid;
    }

    DisableAutoOpperation(HttpMethodType: HttpMethodType[]): void {
        this.autoOpperate = HttpMethodType;
    }

    ExecuteFirst(HttpMethodType: HttpMethodType[]): void {
        this.executeMethodsFirst = HttpMethodType;
    }

    protected ExecuteAsFirst(HttpMethodType: HttpMethodType) : boolean
    {
        var executeFirst = false;

        for (let i = 0; i < this.executeMethodsFirst.length; i++) {
            const method = this.executeMethodsFirst[i];
            if(method == HttpMethodType)
            {
                executeFirst = true;
            }
        }
        return executeFirst;
    }

    protected DisableAutoOpperate(HttpMethodType: HttpMethodType) : boolean
    {
        var disableOpperation = false;

        for (let i = 0; i < this.autoOpperate.length; i++) {
            const method = this.autoOpperate[i];
            if(method == HttpMethodType)
            {
                disableOpperation = true;
            }
        }
        return disableOpperation;
    }

}