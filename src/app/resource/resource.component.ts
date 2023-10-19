import { Component } from '@angular/core';
import { ResourceService } from './resource-service/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourceComponent {
  resourceList: any = [];
  toggleOptions: boolean = false;
  toggleNewResourceInput: boolean = false;
  toggleNewColumnInput: boolean = false;
  query:string='';

  constructor(private resourceService: ResourceService) {}
  ngOnInit(): void {
    this.resourceList = this.resourceService.getResourceList().subscribe({
      next: (data) => (this.resourceList = data),
      error: (err) => console.error(err),
      complete: () => console.log('The request is completed!'),
    });
    //  console.log(this.resourceList)
  }

  searchQuery(){
    this.resourceList = this.resourceService.getResourceList(this.query).subscribe({
      next: (data) => (this.resourceList = data),
      error: (err) => console.error(err),
      complete: () => console.log('The request is completed!'),
    });
  }

  handleToggleOptions() {
    this.toggleOptions = !this.toggleOptions;
  }

  openNewResourceInput() {
    this.toggleNewResourceInput = true;
    this.toggleOptions = false; // closed the options bar
  }
  closeNewResourceInput(isClosed: boolean) {
    this.toggleNewResourceInput = isClosed;
  }

  openNewColumnInput() {
    this.toggleNewColumnInput = true;
    this.toggleOptions = false;
  }

  closeNewColumnInput(isClosed: boolean) {
    this.toggleNewColumnInput = isClosed;
  }
}
