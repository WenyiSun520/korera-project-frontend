export class Resource{
    id:number
    resource_name: string
    created_date: Date
    edited_date: Date
    created_by:string

    constructor(id:number,resource_name:string,creted_by:string){
        this.id = id;
        this.resource_name = resource_name;
        this.created_date = new Date();
        this.edited_date = new Date();
        this.created_by = creted_by
    }
    
    setResourceName(name:string){
        this.resource_name = name
        this.edited_date = new Date()
        
    }

     setResourceId(id:number){
       this.id = id
        this.edited_date = new Date()
    }


}