export class ResourceDetail{
    id:number;
    resourceId:number;
    name:string;
    description:string;
    created_date:Date;
    edited_date:Date;
    created_by:string;

    constructor( id:number,
    resourceId:number,
    detailName:string,
    detailDescription:string,
    created_by:string,){
        this.id = id;
        this.resourceId = resourceId;
        this.description = detailDescription;
        this.name= detailName;
        this.created_date = new Date();
        this.edited_date = new Date();
        this.created_by = created_by;
    }


    setDetailName(name:string){
        this.name = name;
        this.edited_date = new Date();

    }

    setDetailDescription(description:string){
        this.description = description;
         this.edited_date = new Date();
    }



}