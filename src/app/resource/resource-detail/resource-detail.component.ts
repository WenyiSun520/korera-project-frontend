import { Component, Input, Output, EventEmitter, OnInit, AfterContentInit, AfterContentChecked, Renderer2 } from '@angular/core';
import { ResourceDetailService } from '../resource-service/resource-detail.service';
import { ResourceDetail } from '../resourceDetail';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css'],
})
export class ResourceDetailComponent implements OnInit {
  resourceDetailMap: any;
  @Input() toggleNewColumnInput: boolean = false;
  @Output() closeNewColumnInput = new EventEmitter<boolean>();
  newResourceDetailName: string = '';
  resourceDetaildescription:string = '';
  toggleDescriptionInput:boolean = false;

  constructor(
    private resourceDetailService: ResourceDetailService
  ) {}

  ngOnInit(): void {
    this.resourceDetailService
      .getResourceDetailMap()
      .subscribe({
        next: (data) => (this.resourceDetailMap = data),
        error: (err) => console.error(err),
        complete: () => console.log('GetResourceDetailMap request is completed!'),
      });
  }

  submitInput() {
    this.resourceDetailService.addResourceDetail(this.newResourceDetailName);
    console.log(this.newResourceDetailName);
    this.newResourceDetailName = '';
    this.closeNewColumnInput.emit(false);
  }
  cancelInput() {
    this.closeNewColumnInput.emit(false);
  }

  handleOpenEditDescriptionBox() {
    this.toggleDescriptionInput = !this.toggleDescriptionInput

  }
  cancelDescriptionInput(){
    this.toggleDescriptionInput = false;
  }

  submitDescriptionInput(index:number){
    this.resourceDetailService.editResourceDetailDescription(
      index,
      this.resourceDetaildescription
    );
        this.toggleDescriptionInput = false;
  }
}
