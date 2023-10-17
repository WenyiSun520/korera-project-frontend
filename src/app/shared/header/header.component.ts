import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentProject:string = ""
  username: string = "Jone Done"
  isProfileShowed: boolean = false



  toggleProfile(){
    this.isProfileShowed = !this.isProfileShowed

  }

}
