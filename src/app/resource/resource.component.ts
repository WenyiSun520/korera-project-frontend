import { Component } from '@angular/core';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent {
   toggleOptions:boolean = false;
   toggleNewResourceInput:boolean = false
   toggleNewColumnInput:boolean = false;

   handleToggleOptions(){
    this.toggleOptions = !this.toggleOptions
   }

 openNewResourceInput(){
    this.toggleNewResourceInput = true;
    this.toggleOptions = false;  // closed the options bar
  }
 closeNewResourceInput(isClosed:boolean){
  this.toggleNewResourceInput = isClosed;
 }

 openNewColumnInput(){
    this.toggleNewColumnInput = true;
    this.toggleOptions = false;
 }

 closeNewColumnInput(isClosed:boolean){
  this.toggleNewColumnInput = isClosed
 }
}
