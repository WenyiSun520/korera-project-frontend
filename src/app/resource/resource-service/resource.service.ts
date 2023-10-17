import { Injectable } from '@angular/core';
import { Resource } from '../resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  resourceList: Resource[] = [
    new Resource(1234,"Marble","Jone Doe"),
    new Resource(1235,"Moon Stone", "Jone Doe"),
    new Resource(1236,"Star Stone", "Jone Doe"),
    new Resource(1237,"Sun Stone", "Jone Doe"),
    new Resource(1238,"Riber Stone","Jone Doe"),
  ]
  constructor() { }


  getResourceList(){
    return this.resourceList;
  }

  addResource(newResource:Resource){
    this.resourceList.push(newResource)
  }

  editResource(index:number, name:string){
    this.resourceList[index].setResourceName(name)
  }
}
