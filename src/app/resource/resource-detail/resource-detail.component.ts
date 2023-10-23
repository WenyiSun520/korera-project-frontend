import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  ChangeDetectorRef,
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

  constructor(
    private resourceDetailService: ResourceDetailService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resourceDetailMap']) {
      //console.log(changes['resourceList'].currentValue)
      this.resourceDetailMap = changes['resourceDetailMap'].currentValue;
    //  console.log(changes['resourceDetailMap'].currentValue);
    }
    if (changes['resourceList']) {
      this.resourceList = changes['resourceList'].currentValue;
      // console.log(changes['resourceList'].currentValue);
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
          let obj = {
            created_date: new Date(),
            detailDescription: this.newResourceDetailDescription,
            detailID: 0,
            detailName: this.newResourceDetailName,
            latest_modified_by: 'null',
            latest_updated: new Date(),
            resourceID: this.selectedOption,
            resourceName: this.selectedOption,
          };
          let list: any[] = [obj];

          this.resourceList.map((item: any) => {
            if (
              !list.find(
                (resource: any) => resource.resourceID === item.resourceID
              )
            ) {
              let obj = {
                detailID: -1,
                detailName: this.newResourceDetailName,
                detailDescription: 'n/a',
                created_date: '',
                latest_modified_by: 'null',
                latest_updated: '',
                resourceID: item.resourceID,
                resourceName: item.resourceName,
              };
              list.push(obj);
            }
          });
          this.resourceDetailMap.set(
            this.newResourceDetailName,
            list.slice().sort((a: any, b: any) => a.resourceID - b.resourceID)
          );

          this.newResourceDetailName = '';
          this.newResourceDetailDescription = '';
          this.closeNewColumnInput.emit(false);
        },
      });
  }

  editDetailDescription(resourceDetail: any, index: any) {
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
            // let detailList =  this.resourceDetailMap.get(resourceDetail.detailName)
            this.resourceDetailMap.get(resourceDetail.detailName)[
              index
            ].detailDescription = this.resourceDetaildescription;
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
          // next: (data) => (this.resourceDetailMap = data),
          // error:(err)=>console.log("error when updating detail", err),
          complete: () => {
            this.resourceDetailMap.get(resourceDetail.detailName)[
              index
            ].detailDescription = this.resourceDetaildescription;

            // console.log(this.resourceDetailMap);
            console.log('successfully updated!');
          },
        });

      this.toggleDescriptionInput = '';
    }
  }
}
