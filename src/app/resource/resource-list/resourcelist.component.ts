import { Component, Input, OnInit,Output,EventEmitter, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from '../resource-service/resource.service';
import { AuthService } from 'src/app/auth/auth-service/auth.service';

@Component({
  selector: 'app-resourcelist',
  templateUrl: './resourcelist.component.html',
  styleUrls: ['./resourcelist.component.css'],
})
export class ResourcelistComponent implements OnChanges {
  @Input() resourceList: any = [];
  @Output() notifyListUpdated = new EventEmitter<boolean>();
  isHoverIn: string = '';
  boxLeft = 0;
  boxTop = 0;
  resourceForm = new FormGroup({
    resourceID: new FormControl(''),
    resourceName: new FormControl('')
  });

  @Input() toggleNewResourceInput: boolean = false;
  @Output() closeNewResourceInput = new EventEmitter<boolean>();

  constructor(private resourceService: ResourceService, private authService:AuthService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resourceList']) {
     // console.log(changes['resourceList'].currentValue);
      this.resourceList = changes['resourceList'].currentValue;
    }
  }

  submitInput() {
    if (
      this.resourceForm.value.resourceID === '' ||
      this.resourceForm.value.resourceName === ''
    ) {
      window.alert('please fill out all the fields');
    } else {
      let resourceID = +this.resourceForm.value.resourceID!;
      this.resourceService
        .addResource(resourceID, this.resourceForm.value.resourceName!)
        .subscribe({
          next: (data) => console.log(data),
          error: (err) => console.error(err),
          complete: () => {
            this.notifyListUpdated.emit(true)
          //  console.log('The request is completed!', this.resourceList);
          },
        });

      this.cancelInput();
    }
  }

  cancelInput() {
    this.closeNewResourceInput.emit(false);
    this.resourceForm.reset();
  }

  showDetailInfo(id: any, event: MouseEvent) {
    this.boxLeft = event.clientX;
    this.boxTop = event.clientY;
    this.isHoverIn = id;
  }

  hideDetailInfo() {
    this.isHoverIn = '';
  }
}
