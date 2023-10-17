import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string = "Jone Done"
  toggleMenu:boolean = false;

  toggleMenuOpen(){
    this.toggleMenu = true
  }

   toggleMenuClosed(){
    this.toggleMenu = false
  }

}
