import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ResourceDetailService } from '../resource-service/resource-detail.service';
import { ResourceDetail } from '../resourceDetail';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit{
    resourceDetailList:any
    @Input()toggleNewColumnInput:boolean = false
    @Output() closeNewColumnInput = new EventEmitter<boolean>();
    newResourceDetailName:string  = ""

    constructor(private resourceDetailService:ResourceDetailService){}
  ngOnInit(): void {
    this.resourceDetailList = this.resourceDetailService.getResourceDetailList();
  }

  submitInput(){
    // let newResourceDetail = new ResourceDetail()
    // this.resourceDetailService.addResourceDetail

  }
  cancelInput(){
    this.closeNewColumnInput.emit(false);

  }




   
  
}
