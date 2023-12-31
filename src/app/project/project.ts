import { Resource } from "../resource/resource"
export class Project{
    id:number
    name:string
    created_date:Date
    created_by:string
    last_modified:Date
    resourceList:any[]

    constructor(id:number, name:string, created_by:string){
        this.id = id;
        this.name = name;
        this.created_by = created_by;
        this.created_date = new Date();
        this.last_modified = new Date();
        this.resourceList = []
    }

    addResourceToList(resource:Resource){
        this.resourceList.push(resource);
    }
}