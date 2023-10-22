import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ResourceDetailService } from '../resource-service/resource-detail.service';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css'],
})
export class ResourceDetailComponent implements OnChanges {
  @Input() resourceDetailMap: any = [];
  @Input() resourceList: any = [];
  @Input() toggleNewColumnInput: boolean = false;
  @Output() closeNewColumnInput = new EventEmitter<boolean>();
  newResourceDetailName: string = '';
  newResourceDetailDescription: string = '';
  selectedOption: any;
  resourceDetaildescription: string = '';
  toggleDescriptionInput: any;

  constructor(private resourceDetailService: ResourceDetailService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resourceDetailMap']) {
      //console.log(changes['resourceList'].currentValue)
      this.resourceDetailMap = changes['resourceDetailMap'].currentValue;
    }
  }

  cancelInput() {
    this.closeNewColumnInput.emit(false);
  }

  handleOpenEditDescriptionBox(type: any, resourceiD: number) {
    this.toggleDescriptionInput = type + resourceiD;
    this.resourceDetaildescription = '';
  }
  cancelDescriptionInput() {
    // console.log('cancel');
    this.toggleDescriptionInput = '';
  }

  addNewDetail() {
    this.resourceDetailService
      .addResourceDetail(
        this.newResourceDetailName,
        this.newResourceDetailDescription,
        this.selectedOption
      )
      .subscribe({
        // error:(err)=>console.log("error when updating detail", err),
        complete: () => {
          this.newResourceDetailName = '';
          this.newResourceDetailDescription = '';
          this.closeNewColumnInput.emit(false);

        },
      });
  }

  editDetailDescription(resourceDetail: any) {
    if (resourceDetail.detailID === -1) {
      console.log(resourceDetail);
      this.resourceDetailService
        .addResourceDetail(
          resourceDetail.detailName,
          this.resourceDetaildescription,
          resourceDetail.resourceID
        )
        .subscribe({
          // error:(err)=>console.log("error when updating detail", err),
          complete: () => {
            this.resourceDetaildescription = '';
            this.toggleDescriptionInput = '';
            this.cancelDescriptionInput();
          },
        });
    } else {
      // console.log(resourceDetail)
      this.resourceDetailService
        .editResourceDetail(resourceDetail, this.resourceDetaildescription)
        .subscribe({
          // error:(err)=>console.log("error when updating detail", err),
          complete: () => console.log('successfully updated!'),
        });

      this.toggleDescriptionInput = '';
    }
  }
}
