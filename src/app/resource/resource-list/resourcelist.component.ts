import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ResourceService } from '../resource-service/resource.service';
import { Resource } from '../resource';

@Component({
  selector: 'app-resourcelist',
  templateUrl: './resourcelist.component.html',
  styleUrls: ['./resourcelist.component.css']
})
export class ResourcelistComponent implements OnInit{
  resourceList: any
  newResourceName: string = ""
  newResourceCode?: number
  @Input()toggleNewResourceInput:boolean = false
  @Output() closeNewResourceInput = new EventEmitter<boolean>();


  constructor(private resourceService:ResourceService){

  }
  ngOnInit(): void {
    this.resourceList = this.resourceService.getResourceList();
  }

  submitInput(){
    if(this.newResourceName !== "" && this.newResourceCode !== undefined){
      this.resourceService.addResource(new Resource(this.newResourceCode!, this.newResourceName, "Jone Doe"))
    }else{
      window.alert("Please complete the fields!")
    }
  }

  cancelInput(){
    this.closeNewResourceInput.emit(false);
    this.newResourceCode = 1111;
    this.newResourceName = "";

  }



}
