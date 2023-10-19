
export class ResourceDetail {
  id: number;
  resourceIdMap: Map<number, string>; // number is resourceId, string is resourceDescription
  name: string;
  description: string;
  created_date: Date;
  edited_date: Date;
  created_by: string;

  constructor(
    id: number,
    detailName: string,
    detailDescription: string,
    created_by: string
  ) {
    this.id = id;
    this.description = detailDescription;
    this.name = detailName;
    this.created_date = new Date();
    this.edited_date = new Date();
    this.created_by = created_by;
    this.resourceIdMap = new Map<number,string>();
  }

  setDetailName(name: string) {
    this.name = name;
    this.edited_date = new Date();
  }

  setDetailDescription(description: string) {
    this.description = description;
    this.edited_date = new Date();
  }

  updateResourceIdMap(index:number, description:string){
    this.resourceIdMap.set(index, description)
  }
}
