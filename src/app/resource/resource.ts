import { ResourceDetail } from "./resourceDetail"
export class Resource{
    id:number
    resource_name: string
  

    constructor(id:number,resource_name:string){
        this.id = id;
        this.resource_name = resource_name;
    }
}